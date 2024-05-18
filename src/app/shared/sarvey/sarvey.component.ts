import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ValidatorsService } from '../service/validators.service';
import { UserService } from '../../dashboard/services/users.service';
import { TicketService } from '../../dashboard/services/tickets.service';
import { User } from '../../dashboard/interfaces/users';

import { Ticket } from '../../dashboard/interfaces/tickets';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sarvey',
  templateUrl: './sarvey.component.html',
  styleUrls: ['./sarvey.component.css']
})
export class SarveyComponent implements OnInit {
  formTicketSarvey!: FormGroup;
  listUsersSoports: User[] = [];
  ticketSelect!: Ticket;
  soporte!: string;

  constructor(
    private fb: FormBuilder,
    private ticketsService:  TicketService,
    private usersService: UserService,
    private validatorsService: ValidatorsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){
    this.usersService.listaSoportes().subscribe(
      (data) => {
        this.listUsersSoports = data;
      },
      (err) => {}
    );

  }


  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.formTicketSarvey, field);
  }

  getFieldError(field: string) {
    return this.validatorsService.getFieldError(this.formTicketSarvey, field);
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarTicket(id);
    });

    this.formTicketSarvey = this.fb.group({
      satisfaccion: ['', Validators.required],
      sugerencias: [''],
      a_oportuna: ['', Validators.required],
      s_problema: ['', Validators.required],
    });
  }


  cargarTicket(id: string) {
    this.ticketsService.detail(id).subscribe((ticket) => {
      this.ticketSelect = ticket;
    });

  };

  resetTicket(){
    this.formTicketSarvey.reset();
  }



  ticketSarvey(){
    if (this.ticketSelect.soporteReasignado) {
      this.soporte = this.ticketSelect.soporteReasignado
    } else {
      this.soporte = this.ticketSelect.soporteAsignado
    }

    const modelo = {
      satisfaccion:  this.formTicketSarvey.value.satisfaccion,
      sugerencias: this.formTicketSarvey.value.sugerencias,
      a_oportuna: this.formTicketSarvey.value.a_oportuna,
      s_problema: this.formTicketSarvey.value.s_problema,
      soportePresente: this.soporte,
    }
    Swal.fire({
      title: 'Guardando . . . ',
      allowOutsideClick: false,
      showConfirmButton: false,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    this.ticketsService.update(this.ticketSelect.id, modelo).subscribe({
      next: (data) => {
        Swal.close();

        Swal.fire(
          'Encuesta Guardada!',
          `Encuesta de Satisfacción del <strong>Ticket ` + this.ticketSelect.codigo +`</strong> guardado correctamente. <strong>Gracias por su Tiempo</strong>.`,
          'success'
        );
        this.router.navigateByUrl(`auth/panel`)
      },
      error: (message) => {
        Swal.close();

        Swal.fire('Error', `No se ha podido guardar la encuesta de satisfacción del <strong>Ticket ` + this.ticketSelect.codigo +`</strong>.`, 'error');
      },
    })
  }
}
