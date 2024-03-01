import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { OpenPageComponent } from './pages/open-page/open-page.component';
import { QuillModule } from 'ngx-quill';
import { TicketDialogComponent } from './components/dialogs/ticket-dialog/ticket-dialog.component';
import { TableModule } from '../dashboard/components/table/table.module';


@NgModule({
  declarations: [
    OpenPageComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    TicketDialogComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    QuillModule,
    TableModule
  ]
})
export class AuthModule { }
