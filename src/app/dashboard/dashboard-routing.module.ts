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

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'reports', component: ReportsPageComponent },
      { path: 'tickets', component: TicketsPageComponent},
      { path: 'settings', component: SettingsPageComponent },
      { path: 'profile', component: ProfilePageComponent },

      { path: 'users', component: UsersPageComponent},
      { path: 'establishments', component: EstablishmentsPageComponent},
      { path: 'directives', component: DirectivesPageComponent},
      { path: 'districts', component: DistrictsPageComponent},

      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
