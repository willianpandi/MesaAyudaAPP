import { Component, Inject, OnInit } from '@angular/core';
import { Ticket } from '../../../../dashboard/interfaces/tickets';
import { TicketService } from '../../../../dashboard/services/tickets.service';
import { TableColumn } from '../../../../dashboard/components/table/interfaces/table-colum.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent implements OnInit{

  userTickets: Ticket[]  = [];

  tableColumnTickets: TableColumn[] = [];

  constructor(
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public dataTicket: string,

  ){


  }
  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }

  setTableColumns() {
    this.tableColumnTickets = [
      { label: 'N Ticket', def: 'codigo', dataKey: 'codigo', isSticky: true, },
      { label: 'Estado', def: 'estado', dataKey: 'estado' },
      { label: 'Soporte Asignado', def: 'soporteAsignado', dataKey: 'soporteAsignado' },
      { label: 'Soporte Reasignado', def: 'soporteReasignado', dataKey: 'soporteReasignado' },
      { label: 'Link de Encuesta de Satisfacción', def: 'link', dataKey: 'link' },
    ];
  }
  setData(): void {
    this.ticketService.listaTickets(this.dataTicket).subscribe(
      (data) => {
        this.userTickets = data
      },
      (err) => {}
    );
  }
}
