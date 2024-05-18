import { Component, Inject, OnInit } from '@angular/core';
import { TicketsUser } from '../../../../dashboard/interfaces/tickets';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableColumn } from '../../../../dashboard/components/table/interfaces/table-colum.interface';
import { TicketService } from '../../../../dashboard/services/tickets.service';
import { TableConfig } from '../../../../dashboard/components/table/interfaces/table-config.interface';
import { Table, TableAction } from '../../../../dashboard/components/table/interfaces/table-action.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent implements OnInit{

  userTickets: TicketsUser[]  = [];

  tableColumnTickets: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions2: true,
    isPaginable: true,
  };

  constructor(
    private dialogReferencia: MatDialogRef<TicketDialogComponent>,
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public dataTicket: string,
    private router: Router,
  ){


  }

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }


  setTableColumns() {
    this.tableColumnTickets = [
      { label: 'N° Ticket', def: 'codigo', dataKey: 'codigo', isSticky: true, },
      { label: 'Estado', def: 'estado', dataKey: 'estado' },
      { label: 'Soporte Asignado', def: 'soporteAsignado', dataKey: 'soporteAsignado' },
      { label: 'Soporte Reasignado', def: 'soporteReasignado', dataKey: 'soporteReasignado' },
      { label: 'Encuesta', def: 'satisfaccion', dataKey: 'satisfaccion', dataType: 'sarvey'},
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

  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case Table.ENCUESTA:
        this.onSarvey(tableAction.row);
        break;
      default:
        break;
    }
  }

  onSarvey({ id, estado, satisfaccion }: TicketsUser) {
    if (estado === 'CERRADO') {
      if (satisfaccion === null) {
        this.router.navigateByUrl(`encuesta/${id}`);
        this.dialogReferencia.close('encuesta');
      } else {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          html: `Encuesta de satisfaccion ya realizada.`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } else {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        html: `No puede realizar la encuesta, el ticket aun sigue <strong>ABIERTO</strong> / <strong>EN PROCESO</strong>.`,
        showConfirmButton: false,
        timer: 2500,
      });
    }

  }

}
