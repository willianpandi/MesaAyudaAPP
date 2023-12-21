import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ColumValuePipe } from './pipes/colum-values.pipe';



@NgModule({
  declarations: [
    TableComponent, ColumValuePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    TableComponent,
  ],
})
export class TableModule { }
