import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UsersComponent } from './features/users/users.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'controle-acesso',
    children: [
      { path: 'usuarios', component: UsersComponent, data: { breadcrumb: 'Usuários' } },
      { path: 'usuarios/novo', component: UserFormComponent, data: { breadcrumb: 'Cadastro de Usuário' } },
      { path: 'usuarios/:id/editar', component: UserFormComponent, data: { breadcrumb: 'Editar Usuário' } },
    ],
  },
];
