import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from "../../../../dashboard/interfaces/users";
import { UserService } from '../../../../dashboard/services/users.service';
import { ValidatorsService } from '../../../../shared/service/validators.service';
import { TicketService } from '../../../../dashboard/services/tickets.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reassigned-tickets',
  templateUrl: './reassigned-tickets.component.html',
  styleUrls: ['./reassigned-tickets.component.css']
})
export class ReassignedTicketsComponent {
  formReasigTicket!: FormGroup;

  listUsersSoports: User[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogReferencia: MatDialogRef<ReassignedTicketsComponent>,
    private validatorsService: ValidatorsService,
    private usersService: UserService,
    private ticketsService: TicketService,
    @Inject(MAT_DIALOG_DATA) public dataTicket: string,
  ){

    this.formReasigTicket = this.fb.group({
      soporteReasignado: ['', Validators.required]
    })

    this.usersService.listaSoportes().subscribe(
      (data) => {
        this.listUsersSoports = data;
      },
      (err) => {}
    )
  }

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formReasigTicket, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formReasigTicket, field)
  }

  reasigTicket(){
    const modelo = {
      soporteReasignado: this.formReasigTicket.value.soporteReasignado,
    }
    this.ticketsService.updateReasigTicket(this.dataTicket, modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Ticket Reasignado',
          html: `Ticket reseasignado correctamente al usuario soporte: <strong>` +this.formReasigTicket.value.soporteReasignado + `</strong>.`,
          showConfirmButton: false,
          timer: 2500,
        });
        this.dialogReferencia.close('reasignado');
      },
      error: (e) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Ticket NO Reasignado',
          html: `No se pudo reseasignar el ticket correctamente al usuario soporte: <strong>` +this.formReasigTicket.value.soporteReasignado + `</strong>. ` + e,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    });
  }
}
