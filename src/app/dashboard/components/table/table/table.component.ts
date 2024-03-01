import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TableColumn } from '../interfaces/table-colum.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableConfig } from '../interfaces/table-config.interface';
import { Table, TableAction } from '../interfaces/table-action.interface';
import { MatSort } from '@angular/material/sort';
import { ColumValuePipe } from '../pipes/colum-values.pipe';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit{

  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  tableDisplayColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  tableConfig: TableConfig | undefined;
  currentFilterValue: string = '';


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.currentFilterValue = filterValue;
  }

  @Input() set data(data: any) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map( col => col.def)
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  private getColumnValue: ColumValuePipe = new ColumValuePipe();

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      return this.getValue(data, sortHeaderId);
    };
    this.dataSource.paginator = this.paginator;
  }

  getValue(row: any, columnName: string) {
    const column = this.tableColumns.find(
      (col) => col.dataKey === columnName
    ) as TableColumn;
    return this.getColumnValue.transform(row, column);
  }


  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }

  @Output() action: EventEmitter<TableAction> = new EventEmitter();

  // configuraciones de la tabla
  setConfig( config: TableConfig) {
    this.tableConfig = config;
    if (this.tableConfig.showActions ) {
      this.tableDisplayColumns.push('actions')
    }
  }

  onEdit(row: any) {
    this.action.emit({ action: Table.EDITAR, row });
  }

  onDelete(row: any) {
    this.action.emit({ action: Table.ELIMINAR, row });
  }

  exportToCsv(data: any[], filename: string) {

    const csvData = data.map(item => {
      const establecimientoIDs = item.estableishments ? item.estableishments.map((est: { nombre: string }) => est.nombre) : [];
      const categoriaIDs = item.categories ? item.categories.map((cat: { nombre: string }) => cat.nombre) : [];
      const subcategoriaIDs = item.subcategories ? item.subcategories.map((scat: { nombre: string }) => scat.nombre) : [];

      const rowData = {
        ...item,
        ...(item.category && { category: item.category.nombre }),
        ...(item.subcategory && { subcategory: item.subcategory.nombre }),
        ...(item.estableishment && { estableishment: item.estableishment.nombre }),
        ...(item.district && { district: item.district.nombre }),
        ...(establecimientoIDs.length > 0 && { estableishments: establecimientoIDs }),
        ...(categoriaIDs.length > 0 && { categories: categoriaIDs }),
        ...(subcategoriaIDs.length > 0 && { subcategories: subcategoriaIDs }),
      };
      return rowData;
    });

    const csv = '\uFEFF' + Papa.unparse(csvData, {
      delimiter: ";",
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
