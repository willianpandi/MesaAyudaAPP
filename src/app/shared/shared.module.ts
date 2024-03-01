import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { MaterialModule } from '../material/material.module';
import { SarveyComponent } from './sarvey/sarvey.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Error404PageComponent,
    SarveyComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    Error404PageComponent,
  ]
})
export class SharedModule { }
