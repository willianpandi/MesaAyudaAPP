import {Component, OnInit} from '@angular/core';
import { TableColumn } from '../../components/table/interfaces/table-colum.interface';
import { TicketService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/tickets';
import { TableConfig } from '../../components/table/interfaces/table-config.interface';
import { Table, TableAction } from '../../components/table/interfaces/table-action.interface';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets-page.component.html',
  styleUrls: ['./tickets-page.component.css']
})
export class TicketsPageComponent implements OnInit {
  ticketList: Ticket[]  = [];
  tableColumnsTickets: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
  };


  constructor(
    private ticketsService: TicketService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();

    //IMPONIENDO UN TIPO DE 5 SEGUNDOS DE CARAG
    // setTimeout(() => {
    //   this.userList = CUSTOMERS_DATA_MOCK
    // }, 5000);
  }

  setTableColumns() {
    this.tableColumnsTickets = [
      { label: 'N° Ticket', def: 'codigo', dataKey: 'codigo' },
      { label: 'Estado', def: 'estado', dataKey: 'estado' },
      { label: 'Fecha de Creación', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Fecha de Actualización', def: 'apdateAt', dataKey: 'apdateAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Categoría', def: 'directive.nombre', dataKey: 'directive.nombre', dataType: 'object' },
      { label: 'Problema', def: 'titulo', dataKey: 'titulo' },
    ];
  }

  setData(): void {
    this.ticketsService.lista().subscribe(
      (data) => {
        this.ticketList = data;
      },
      (err) => {
        console.log(err)
      }
    );
  }

  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case Table.EDITAR:
        this.onEdit(tableAction.row);
        break;

      case Table.ELIMINAR:
        this.onDelete(tableAction.row);
        break;

      default:
        break;
    }
  }



  onEdit({ id }: Ticket) {
    console.log('Edit', id);
    this.router.navigateByUrl(`dashboard/ticket/${id}`)
  }

  newTicket(){
    this.router.navigateByUrl('dashboard/ticket/nuevo')
  }

  onDelete(ticket: Ticket) {
    console.log('Delete', ticket);
    Swal.fire({
      title: 'ADVERTENCIA',
      text: '¿Estás seguro de eliminar el ticket?',
      icon: 'warning',
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketsService.delete(ticket.id).subscribe({
          next: ( resp ) => {
              Swal.fire(
                'Eliminado!',
                'Su ticket ha sido eliminado correctamente.',
                'success'
              );
              this.setData();
          },
          // next: (affectedRows: { affected: number }) => {
          //   if (affectedRows.affected === 1) {
          //     Swal.fire(
          //       'Eliminado!',
          //       'Su ticket ha sido eliminado correctamente.',
          //       'success'
          //     );
          //     this.setData();
          //   } else {
          //     Swal.fire(
          //       'Advertencia',
          //       'No se ha eliminado el ticket, por que mantiene una relacion con otro dato',
          //       'warning'
          //     );
          //   }
          // },
          error: (message) => {
            Swal.fire('Error', message, 'error');
          },
        });
      }
    });
  }

  onView({ id }: Ticket) {
    console.log('View', id);
    this.router.navigateByUrl(`dashboard/ticketd/${id}`)
  }
}
