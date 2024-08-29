import { Component, inject, OnInit, signal } from '@angular/core';
import { AllRolComponent } from './all-rol/all-rol.component';
import { CommonModule } from '@angular/common';
import { Rol } from '../../interfaces/rol.interface';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule,AllRolComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent implements OnInit{
  rolService = inject(RolService)
  roles = signal<Rol[]>([]);

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this.rolService.getRoles()
    .subscribe({
      next: (roles)=>{
        this.roles.set(roles)
      },
      error:(error)=>{
        console.error('Error loading roles:', error);
      }
    })
  }
}
