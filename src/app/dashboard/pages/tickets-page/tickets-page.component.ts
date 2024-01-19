import {Component, OnInit} from '@angular/core';
import { TableColumn } from '../../components/table/interfaces/table-colum.interface';
import { TicketService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/tickets';
import { TableConfig } from '../../components/table/interfaces/table-config.interface';
import { Table, TableAction } from '../../components/table/interfaces/table-action.interface';
import { TicketDialogComponent } from '../../components/dialogs/ticket-dialog/ticket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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
      // { label: 'N° Ticket', def: 'id', dataKey: 'id' },
      { label: 'Fecha de Inicio', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'HH:mm - dd/MM/yyyy' },
      { label: 'Fecha de Finalización', def: 'apdateAt', dataKey: 'apdateAt', dataType: 'date', formatt: 'HH:mm - dd/MM/yyyy' },
      { label: 'N° Cédula', def: 'user.usuario', dataKey: 'user.usuario', dataType: 'object'},
      { label: 'Nombre', def: 'user.nombre', dataKey: 'user.nombre', dataType: 'object'},
      { label: 'Establecimiento', def: 'user.estableishment.nombre', dataKey: 'user.estableishment.nombre', dataType: 'object'},
      { label: 'Problema', def: 'directive', dataKey: 'directive.nombre', dataType: 'object' },
      { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
      { label: 'Archivos', def: 'archivo', dataKey: 'archivo', dataType:'object' },
      { label: 'Área', def: 'area', dataKey: 'area' },
      { label: 'Piso', def: 'piso', dataKey: 'piso' },
      { label: 'N° Sala', def: 'n_sala', dataKey: 'n_sala' },
      { label: 'N° Consultorio', def: 'n_consultorio', dataKey: 'n_consultorio' },
      { label: 'Satisfaccion', def: 'sarvey', dataKey: 'sarvey' },
      { label: 'Estado', def: 'estado', dataKey: 'estado' },
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

  ticketDialog(){
    this.dialog.open(TicketDialogComponent, {
      disableClose: true,
      width:"800px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.setData();
      }
    })
  }

  onEdit(dataTickets: Ticket) {
    console.log('Edit', dataTickets);
    this.dialog.open(TicketDialogComponent, {
      disableClose: true,
      width:"800px",
      data: dataTickets
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.setData();
      }
    })
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
          next: (affectedRows: { affected: number }) => {
            if (affectedRows.affected === 1) {
              Swal.fire(
                'Eliminado!',
                'Su ticket ha sido eliminado correctamente.',
                'success'
              );
              this.setData();
            } else {
              Swal.fire(
                'Advertencia',
                'No se ha eliminado el ticket, por que mantiene una relacion con otro dato',
                'warning'
              );
            }
          },
          error: (message) => {
            Swal.fire('Error', message, 'error');
          },
        });
      }
    });
  }
}



