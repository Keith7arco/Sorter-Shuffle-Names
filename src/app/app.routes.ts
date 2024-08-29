import { Routes } from '@angular/router';
import { PersonComponent } from './components/person/person.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    loadComponent: () => import('./home/home.component').then((m)=>m.HomeComponent),
  },
  {
    path:'about',
    loadComponent: () => import('./about/about.component').then((m)=>m.AboutComponent),
  },
  {
    path:'roles',
    loadComponent: () => import('./components/rol/rol.component').then((m)=>m.RolComponent),
  },
  {
    path:'persons',
    loadComponent: () => import('./components/person/person.component').then((m)=>m.PersonComponent),
  },
];
