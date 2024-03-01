import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { TicketsPageComponent } from './pages/table-pages/tickets-page/tickets-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { CategoriesPageComponent } from './pages/table-pages/categories-page/categories-page.component';
import { DistrictsPageComponent } from './pages/table-pages/districts-page/districts-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersPageComponent } from './pages/table-pages/users-page/users-page.component';
import { TicketDetailPageComponent } from './pages/ticket-detail-page/ticket-detail-page.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent, data: {titulo: 'INICIO'} },
      { path: 'assigned-tickets', component: TicketsPageComponent, data: {titulo: 'MIS TICKETS'}  },
      { path: 'ticket-detail/:id', component: TicketDetailPageComponent, data: {titulo: 'DETALLE DE TICKET'}  },
      { path: 'user-detail/:id', component: UserDetailPageComponent, data: {titulo: 'DETALLE DE USUARIO'}  },
      { path: 'settings', component: SettingsPageComponent, data: {titulo: 'CONFIGURACIÓN'}  },
      { path: 'profile', component: ProfilePageComponent, data: {titulo: 'PERIL DE USUARIO'}  },

      { path: 'reports', component: ReportsPageComponent, data: {titulo: ' REPORTES'}  },
      { path: 'users', component: UsersPageComponent, data: {titulo: 'DATOS DE USUARIOS'}  },
      { path: 'categories', component: CategoriesPageComponent, data: {titulo: 'TEMAS DE AYUDA'}  },
      { path: 'eods', component: DistrictsPageComponent, data: {titulo: 'DATOS DE EODS'}  },

      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
