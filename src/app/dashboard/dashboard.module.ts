import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { TicketsPageComponent } from './pages/table-pages/tickets-page/tickets-page.component';
import { MaterialModule } from '../material/material.module';
import { TableModule } from './components/table/table.module';
import { DistrictsPageComponent } from './pages/table-pages/districts-page/districts-page.component';
import { CategoriesPageComponent } from './pages/table-pages/categories-page/categories-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersPageComponent } from './pages/table-pages/users-page/users-page.component';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstableishmentDialogComponent } from './components/dialogs/estableishment-dialog/estableishment-dialog.component';
import { DistrictDialogComponent } from './components/dialogs/district-dialog/district-dialog.component';
import { CategoryDialogComponent } from './components/dialogs/category-dialog/category-dialog.component';
import { PipesModule } from '../pipes/pipes.module';
import { ImageDialogComponent } from './components/dialogs/image-dialog/image-dialog.component';
import { QuillModule } from 'ngx-quill';
import { TicketDetailPageComponent } from './pages/ticket-detail-page/ticket-detail-page.component';
import { SubcategoryDialogComponent } from './components/dialogs/subcategory-dialog/subcategory-dialog.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { ReassignedTicketsComponent } from './components/dialogs/reassigned-tickets/reassigned-tickets.component';
import { ChangeTicketComponent } from './components/dialogs/change-ticket/change-ticket.component';
import { CreateTicketComponent } from './components/dialogs/create-ticket/create-ticket.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomePageComponent,
    ReportsPageComponent,
    SettingsPageComponent,
    TicketsPageComponent,
    DistrictsPageComponent,
    CategoriesPageComponent,
    ProfilePageComponent,
    UsersPageComponent,
    UserDialogComponent,
    EstableishmentDialogComponent,
    DistrictDialogComponent,
    CategoryDialogComponent,
    ImageDialogComponent,
    TicketDetailPageComponent,
    SubcategoryDialogComponent,
    UserDetailPageComponent,
    ReassignedTicketsComponent,
    ChangeTicketComponent,
    CreateTicketComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    TableModule,
    ReactiveFormsModule,
    PipesModule,
    QuillModule,
  ]
})
export class DashboardModule { }
