import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../../interfaces/person.interface';
import { PersonService } from '../../../services/person.service';
import { Rol } from '../../../interfaces/rol.interface';
import { RolService } from '../../../services/rol.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

interface CreatePersonDto{
  name:string;
  rol:Rol;
}

@Component({
  selector: 'app-all-person',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxPaginationModule],
  templateUrl: './all-person.component.html',
  styleUrl: './all-person.component.scss'
})
export class AllPersonComponent implements OnInit {
  @Input() persons: Person[] = [];
  roles: Rol[] = [];
  isModalOpen = false;
  isEditing = false;
  modalTitle = 'Add Rol';
  person: CreatePersonDto = { 
    name: '',
    rol: { _id: '', name: '', grade: 0 }
  };
  currentPersonId: string | null = null;
  currentPage = 1;
  itemsPerPage = 6; 
  isLoading: boolean = true;

  constructor(private personService: PersonService, private rolService: RolService) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.rolService.getRoles().subscribe({
      next: (roles: Rol[]) => {
        this.roles = roles;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading roles:', error);
        this.isLoading = false;
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditing = false;
    this.modalTitle = 'Add Rol';
    this.person = { 
      name: '',
      rol: { _id: '', name: '', grade: 0 }
    };
    this.currentPersonId = null;
  }

  onSave() {
    const personToSave = {
      name: this.person.name,
      rolId: this.person.rol._id
    };

    if (this.currentPersonId) {
      this.personService.updatePerson(this.currentPersonId, this.person).subscribe({
        next: (updatedPerson: Person) => {
          console.log('Person updated successfully:', updatedPerson);
          this.persons = this.persons.map(r => r._id === updatedPerson._id ? updatedPerson : r);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating person:', error);
        }
      });
    } else {
      this.personService.createPerson(personToSave).subscribe({
        next: (newPerson: Person) => {
          console.log('Person created successfully:', newPerson);
          this.persons = [...this.persons, newPerson];
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating person:', error);
        }
      });
    }
  }

  editPerson(person: Person) {
    this.isEditing = true;
    this.modalTitle = 'Edit Person';
    this.person = { 
      name: person.name, 
      rol: this.roles.find(r => r._id === person.rol._id) || { _id: '', name: '', grade: 0 } 
    };
    this.currentPersonId = person._id;
    this.openModal();
  }

  deletePerson(id: string) {
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(id).subscribe({
        next: () => {
          console.log('Person deleted successfully');
          this.persons = this.persons.filter(r => r._id !== id);
        },
        error: (error) => {
          console.error('Error deleting person:', error);
        }
      });
    }
  }
}

