import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment';
import { Person } from '../interfaces/person.interface';
import { Rol } from '../interfaces/rol.interface';

interface personToSave{
  name:string;
  rolId:string;
}
interface CreatePersonDto{
  name:string;
  rol:Rol;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  http = inject(HttpClient);
  constructor() { }

  getPersons(grade:string=''){
    let url = `${environment.apiBaseUrl}/persons`
    if(grade){
      url +=`?grade=${+grade}`
    }
    return this.http.get<Person[]>(url);
  }
  
  getPersonShuffle(grade:string){
    let url = `${environment.apiBaseUrl}/persons/shuffle/${+grade}`
    return this.http.get<any[]>(url)
  }

  createPerson(person:personToSave){
    return this.http.post<Person>(`${environment.apiBaseUrl}/persons`,person);
  }
  
  updatePerson(id:string,person:CreatePersonDto){
    return this.http.patch<Person>(`${environment.apiBaseUrl}/persons/${id}`,person);
  }

  deletePerson(id:string){
    return this.http.delete<void>(`${environment.apiBaseUrl}/persons/${id}`)
  }
}
