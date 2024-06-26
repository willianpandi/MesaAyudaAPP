import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TableColumn } from '../interfaces/table-colum.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableConfig } from '../interfaces/table-config.interface';
import { Table, TableAction } from '../interfaces/table-action.interface';
import { MatSort } from '@angular/material/sort';
import { ColumValuePipe } from '../pipes/colum-values.pipe';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements AfterViewInit{

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
      this.tableDisplayColumns.push('actions1')
    }
  }

  onView(row: any) {
    this.action.emit({ action: Table.DETALLE, row });
  }
}
