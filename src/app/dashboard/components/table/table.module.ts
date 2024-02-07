import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ColumValuePipe } from './pipes/colum-values.pipe';
import { TableDetailComponent } from './table-detail/table-detail.component';



@NgModule({
  declarations: [
    TableComponent, ColumValuePipe, TableDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    TableComponent,
    TableDetailComponent,
  ],
})
export class TableModule { }
