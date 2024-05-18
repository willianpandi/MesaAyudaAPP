import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidatorsService } from '../../../../shared/service/validators.service';
import { TicketService } from '../../../../dashboard/services/tickets.service';
import { Ticket } from '../../../../dashboard/interfaces/tickets';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit{
  formCreatTicket!: FormGroup;
  ticket!: Ticket;


  constructor(
    private dialogReferencia: MatDialogRef<CreateTicketComponent>,
    private fb: FormBuilder,
    private ticketsService: TicketService,

    private validatorsService: ValidatorsService,
    @Inject(MAT_DIALOG_DATA) public idTicket: string,

  ){}

  ngOnInit(): void {
    this.ticketsService.detail(this.idTicket).subscribe(
      (data) =>{
        this.ticket = data;
      },
      (error) => {}
    );
    this.formCreatTicket = this.fb.group({
      cedula: ['', [Validators.required,Validators.minLength(10)]],
      nombre: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      telefono: ['', [Validators.required,Validators.minLength(10)]],
    })
  }

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formCreatTicket, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formCreatTicket, field)
  }

  crearTicket(){
    const modelo = {
      cedula: this.formCreatTicket.value.cedula,
      correo_electronico: this.formCreatTicket.value.correo_electronico,
      nombre: this.formCreatTicket.value.nombre,
      telefono: this.formCreatTicket.value.telefono,

      estado: this.ticket.estado,
      category: this.ticket.category.id,
      subcategory: this.ticket.subcategory.id,
      requerimiento: this.ticket.requerimiento,
      descripcion: this.ticket.descripcion,
      estableishment: this.ticket.estableishment.id,
      area: this.ticket.area,
      piso: this.ticket.piso,
      n_sala: this.ticket.n_sala,
      n_consultorio: this.ticket.n_consultorio,
      soporteAsignado: this.ticket.soporteAsignado,

    };
    Swal.fire({
      title: 'Creando . . . ',
      allowOutsideClick: false,
      showConfirmButton: false,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading();
      }
    });
    this.ticketsService.createTicket(modelo).subscribe({
      next: (data) => {
        Swal.close();
        Swal.fire({
          title: `Ticket ${data.codigo} Creado`,
          icon: 'success',
          html: `<strong>Solicitud de Ticket de Ayuda ${data.codigo}</strong> creado correctamente`,
        });
        this.dialogReferencia.close('creado');
      },
      error: (e) => {
        Swal.close();
        Swal.fire({
          title: 'Ticket No Creado',
          icon: 'error',
          text: 'No se pudo crear el ticket. ' + e,
        });
      },
    })

  }
}
