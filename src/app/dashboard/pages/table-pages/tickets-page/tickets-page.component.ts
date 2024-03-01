import {Component, OnInit} from '@angular/core';
import { TableColumn } from '../../../components/table/interfaces/table-colum.interface';
import { TicketService } from '../../../services/tickets.service';
import { Ticket } from '../../../interfaces/tickets';
import { TableConfig } from '../../../components/table/interfaces/table-config.interface';
import { Table, TableAction } from '../../../components/table/interfaces/table-action.interface';
import { Router } from '@angular/router';
import { UserService } from '../../../services/users.service';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets-page.component.html',
  styleUrls: ['./tickets-page.component.css']
})
export class TicketsPageComponent implements OnInit {
  ticketList: Ticket[]  = [];
  tableColumnsTickets: TableColumn[] = [];
  tableColumnsTicketsReasig: TableColumn[] = [];
  tableColumnsTicketsClose: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
    showFilter: true,
    isPaginable: true,
  };

  newTicketsList: Ticket[] = [];
  reasigTicketsList: Ticket[] = [];



  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private router: Router,

  ) {
  }
  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }

  setTableColumns() {
    this.tableColumnsTickets = [
      { label: 'N° Ticket', def: 'codigo', dataKey: 'codigo', isSticky: true, },
      { label: 'Estado', def: 'estado', dataKey: 'estado' },
      { label: 'Fecha Creación', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Unidad/Gestión', def: 'estableishment.nombre', dataKey: 'estableishment.nombre', dataType: 'object'},
      { label: 'Departamento', def: 'subcategory.nombre', dataKey: 'subcategory.nombre', dataType: 'object' },
      { label: 'Requerimiento', def: 'requerimiento', dataKey: 'requerimiento' },
    ];
    this.tableColumnsTicketsReasig = [
      { label: 'N° Ticket', def: 'codigo', dataKey: 'codigo', isSticky: true, },
      { label: 'Estado', def: 'estado', dataKey: 'estado' },
      { label: 'Fecha Reasignación', def: 'reasignadoAt', dataKey: 'reasignadoAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Unidad/Gestión', def: 'estableishment.nombre', dataKey: 'estableishment.nombre', dataType: 'object'},
      { label: 'Departamento', def: 'subcategory.nombre', dataKey: 'subcategory.nombre', dataType: 'object' },
      { label: 'Requerimiento', def: 'requerimiento', dataKey: 'requerimiento' },
    ];
  }

  setData(): void {
    this.userService.listNewTickets().subscribe(
      (data) => {
        this.newTicketsList = data;
      },
      (err) => {}
    );
    this.ticketService.listTicketsReasig().subscribe(
      (data) => {
        const filtData: Ticket[] = data;

        this.reasigTicketsList = filtData;
      },
      (err) => {}
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
    this.router.navigateByUrl(`dashboard/ticket-detail/${id}`)
  }

}
