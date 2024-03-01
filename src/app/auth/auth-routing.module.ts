import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OpenPageComponent } from './pages/open-page/open-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'panel', component: OpenPageComponent, data: {titulo: 'TICKET'}},
      { path: 'login', component: LoginPageComponent, data: {titulo: 'LOGIN'}},
      { path: '**', redirectTo: 'panel' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
