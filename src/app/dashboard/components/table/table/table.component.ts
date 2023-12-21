import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TableColumn } from '../interfaces/table-colum.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableConfig } from '../interfaces/table-config.interface';
import { Table, TableAction } from '../interfaces/table-action.interface';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit{

  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource();
  tableDisplayColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  tableConfig: TableConfig | undefined;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map( col => col.def)
  }

  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }

  @Output() action: EventEmitter<TableAction> = new EventEmitter();


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // configuraciones de la tabla

  setConfig( config: TableConfig) {
    this.tableConfig = config;
    if (this.tableConfig.showActions ) {
      this.tableDisplayColumns.push('actions')
      // this.tableDisplayColumns.push('actions1')
    }
  }

  onEdit(row: any) {
    this.action.emit({ action: Table.EDITAR, row });
  }

  onDelete(row: any) {
    this.action.emit({ action: Table.ELIMINAR, row });
  }


}
