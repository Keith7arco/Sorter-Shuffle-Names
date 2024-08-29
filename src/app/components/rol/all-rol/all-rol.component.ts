import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rol } from '../../../interfaces/rol.interface';
import { RolService } from '../../../services/rol.service';

interface CreateRolDto {
  name: string;
  grade: number;
}

@Component({
  selector: 'app-all-rol',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-rol.component.html',
  styleUrls: ['./all-rol.component.scss']
})
export class AllRolComponent {
  @Input() roles: Rol[] = [];
  isModalOpen = false;
  isEditing = false;
  modalTitle = 'Add Rol';
  rol: CreateRolDto = { name: '', grade: 1 };
  currentRolId: string | null = null;

  constructor(private rolService: RolService) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditing = false;
    this.modalTitle = 'Add Rol';
    this.rol = { name: '', grade: 1 };
    this.currentRolId = null;
  }

  onGradeChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  this.rol.grade = Number(selectElement.value); // Convertir el valor a número
  }

  onSave() {
    if (this.currentRolId) {
      this.rolService.updateRol(this.currentRolId, this.rol).subscribe({
        next: (updatedRol: Rol) => {
          console.log('Rol updated successfully:', updatedRol);
          this.roles = this.roles.map(r => r._id === updatedRol._id ? updatedRol : r);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating rol:', error);
        }
      });
    } else {
      this.rolService.createRol(this.rol).subscribe({
        next: (newRol: Rol) => {
          console.log('Rol created successfully:', newRol);
          this.roles = [...this.roles, newRol];
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating rol:', error);
        }
      });
    }
  }

  editRol(rol: Rol) {
    this.isEditing = true;
    this.modalTitle = 'Edit Rol';
    this.rol = { name: rol.name, grade: rol.grade };
    this.currentRolId = rol._id;
    this.openModal();
  }

  deleteRol(id: string) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.rolService.deleteRol(id).subscribe({
        next: () => {
          console.log('Rol deleted successfully');
          this.roles = this.roles.filter(r => r._id !== id);
        },
        error: (error) => {
          console.error('Error deleting rol:', error);
        }
      });
    }
  }
}




