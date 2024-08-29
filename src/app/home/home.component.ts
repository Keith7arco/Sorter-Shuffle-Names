import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonComponent } from '../components/person/person.component';
import { PersonService } from '../services/person.service';
import { Person } from '../interfaces/person.interface';
import { ShuffleComponent } from '../components/shuffle/shuffle.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,PersonComponent,ShuffleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  personService = inject(PersonService);
  persons = signal<Person[]>([]);

  ngOnInit(): void {
      this.getPersons();
      //this.getPersonShuffle('3');
  }

  getPersons(grade:string=''){
    this.personService.getPersons(grade)
    .subscribe((persons)=>{
      this.persons.set(persons);
    })
  }

  getPersonShuffle(grade:string){
    this.personService.getPersonShuffle(grade)
    .subscribe((persons)=>{
      this.persons.set(persons);
    })
  }
}
