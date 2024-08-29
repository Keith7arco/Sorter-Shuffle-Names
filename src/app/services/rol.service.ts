import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment';
import { Rol } from '../interfaces/rol.interface';

interface CreateRolDto{
  name:string;
  grade:number;
}

@Injectable({
  providedIn: 'root'
})
export class RolService {
  http = inject(HttpClient);
  constructor() { }

  getRoles(){
    return this.http.get<Rol[]>(`${environment.apiBaseUrl}/roles`);
  }

  createRol(rol:CreateRolDto){
    return this.http.post<Rol>(`${environment.apiBaseUrl}/roles`,rol);
  }

  updateRol(id:string,rol:CreateRolDto,){
    return this.http.patch<Rol>(`${environment.apiBaseUrl}/roles/${id}`,rol)
  }

  deleteRol(id:string){
    return this.http.delete<void>(`${environment.apiBaseUrl}/roles/${id}`)
  }
}
