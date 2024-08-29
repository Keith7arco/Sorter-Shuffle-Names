import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Person } from '../../interfaces/person.interface';
import { PersonService } from '../../services/person.service';
import { AllPersonComponent } from "./all-person/all-person.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule,AllPersonComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit{
  personService = inject(PersonService)
  person = signal<Person[]>([]);

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(){
    this.personService.getPersons()
    .subscribe((persons)=>{
      this.person.set(persons)
    })
  }
}
