import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../interfaces/tickets';
import { TicketService } from '../../services/tickets.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../../components/table/interfaces/table-colum.interface';
import { TableConfig } from '../../components/table/interfaces/table-config.interface';
import { Table, TableAction } from '../../components/table/interfaces/table-action.interface';
import { DirectivaService } from '../../services/directives.service';
import { Directive } from '../../interfaces/directives';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css'],

})
export class ReportsPageComponent implements OnInit {
  ticketList: Ticket[]  = [];
  tableColumnsTickets: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
  };

  constructor(
    private ticketsService: TicketService,
    private router: Router,

  ) {
  }
  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }

  setTableColumns() {
    this.tableColumnsTickets = [
      { label: 'N° Ticket', def: 'codigo', dataKey: 'codigo' },
      { label: 'Estado', def: 'estado', dataKey: 'estado' },
      { label: 'Fecha de Creación', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'HH:mm - dd/MM/yyyy' },
      { label: 'Fecha de Actualización', def: 'apdateAt', dataKey: 'apdateAt', dataType: 'date', formatt: 'HH:mm - dd/MM/yyyy' },
      { label: 'Categoría', def: 'directive.nombre', dataKey: 'directive.nombre', dataType: 'object' },
      { label: 'Problema', def: 'titulo', dataKey: 'titulo' },
    ];
  }

  setData(): void {
    this.ticketsService.lista().subscribe(
      (data) => {
        this.ticketList = data;
        console.log(this.ticketList);

      },
      (err) => {
        console.log({error: err})
      }
    );
  }
  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case Table.DETALLE:
        this.onView(tableAction.row);
        break;

      default:
        break;
    }
  }


  onView({ id }: Ticket) {
    console.log('View', id);
    this.router.navigateByUrl(`dashboard/ticketd/${id}`)
  }
}
