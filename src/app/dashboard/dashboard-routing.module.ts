import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { EstablishmentsPageComponent } from './pages/table-pages/establishments-page/establishments-page.component';
import { DirectivesPageComponent } from './pages/table-pages/directives-page/directives-page.component';
import { DistrictsPageComponent } from './pages/table-pages/districts-page/districts-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersPageComponent } from './pages/table-pages/users-page/users-page.component';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';
import { TicketPageComponent } from './pages/ticket-page/ticket-page.component';
import { TicketDetailPageComponent } from './pages/ticket-detail-page/ticket-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent, data: {titulo: 'INICIO'} },
      { path: 'reports', component: ReportsPageComponent, data: {titulo: 'TICKETS ASIGNADOS'}  },
      { path: 'tickets', component: TicketsPageComponent, data: {titulo: ' MIS TICKETS'}  },
      { path: 'ticket/:id', component: TicketPageComponent, data: {titulo: 'TICKET'}  },
      { path: 'ticketd/:id', component: TicketDetailPageComponent, data: {titulo: 'DETALLE DE TICKET'}  },
      { path: 'settings', component: SettingsPageComponent, data: {titulo: 'CONFIGURACIÓN'}  },
      { path: 'profile', component: ProfilePageComponent, data: {titulo: 'PERIL DE USUARIO'}  },

      { path: 'users', component: UsersPageComponent, data: {titulo: 'DATOS DE USUARIOS'}  },
      { path: 'establishments', component: EstablishmentsPageComponent, data: {titulo: 'DATOS DE ESTABLECIMIENTOS'}  },
      { path: 'directives', component: DirectivesPageComponent, data: {titulo: 'DATOS DE DIRECTIVAS'}  },
      { path: 'districts', component: DistrictsPageComponent, data: {titulo: 'DATOS DE DIRECTRICES'}  },

      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
