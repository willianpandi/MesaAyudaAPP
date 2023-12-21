import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { MaterialModule } from '../material/material.module';
import { TableModule } from './components/table/table.module';
import { DistrictsPageComponent } from './pages/table-pages/districts-page/districts-page.component';
import { DirectivesPageComponent } from './pages/table-pages/directives-page/directives-page.component';
import { EstablishmentsPageComponent } from './pages/table-pages/establishments-page/establishments-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersPageComponent } from './pages/table-pages/users-page/users-page.component';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstableishmentDialogComponent } from './components/dialogs/estableishment-dialog/estableishment-dialog.component';
import { DistrictDialogComponent } from './components/dialogs/district-dialog/district-dialog.component';
import { DirectiveDialogComponent } from './components/dialogs/directive-dialog/directive-dialog.component';
import { TicketDialogComponent } from './components/dialogs/ticket-dialog/ticket-dialog.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomePageComponent,
    ReportsPageComponent,
    SettingsPageComponent,
    TicketsPageComponent,
    DistrictsPageComponent,
    DirectivesPageComponent,
    EstablishmentsPageComponent,
    ProfilePageComponent,
    UsersPageComponent,
    UserDialogComponent,
    EstableishmentDialogComponent,
    DistrictDialogComponent,
    DirectiveDialogComponent,
    TicketDialogComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    TableModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
