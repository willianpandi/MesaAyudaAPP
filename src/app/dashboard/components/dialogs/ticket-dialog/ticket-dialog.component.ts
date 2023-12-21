import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Profile,} from 'src/app/dashboard/interfaces/users';
import { Ticket } from 'src/app/dashboard/interfaces/tickets';
import { TicketService } from 'src/app/dashboard/services/tickets.service';
import { Estableishment } from 'src/app/dashboard/interfaces/estableishments';
import { Directive } from 'src/app/dashboard/interfaces/directives';
import { EstablecimientoService } from 'src/app/dashboard/services/estableishments.service';
import { UsuarioService } from 'src/app/dashboard/services/users.service';
import { DirectivaService } from 'src/app/dashboard/services/directives.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css'],
})
export class TicketDialogComponent implements OnInit{

  formTicket: FormGroup;
  tituloAccion:string = "Nuevo";
  botonAccion: string = "Guardar";
  listaEstableishment: Estableishment[] = [];
  listaUser: Profile[] = [];
  listaDirective: Directive[] = [];
  iconAccion: string = 'add_circle';

  selectedFile: any = null;

onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

}

  constructor(
    private dialogReferencia: MatDialogRef<TicketDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private ticketsService: TicketService,
    private userService: UsuarioService,
    private directiveService: DirectivaService,
    private estableishmentService: EstablecimientoService,
    @Inject(MAT_DIALOG_DATA) public dataTickets: Ticket,
  ){
    this.formTicket = this.fb.group({
      descripcion: ["", Validators.required],
      archivo:[""],
      area:  ["", Validators.required],
      piso: ["", Validators.required],
      n_sala: ["", Validators.required],
      n_consultorio: ["", Validators.required],
      estado:   ["NUEVO",Validators.required],
      user:    ["", Validators.required],
      // estableishment:["", Validators.required],
      directive:  ["", Validators.required],
      // sarvey:    [""],
    })
    this.userService.lista().subscribe(
      data => {
        this.listaUser = data;
      },
      err => {

      }
    );
    this.directiveService.lista().subscribe(
      data => {
        this.listaDirective = data;
      },
      err => {

      }
    );
    this.estableishmentService.lista().subscribe(
      data => {
        this.listaEstableishment = data;
      },
      err => {

      }
    );
  }

  addTicket(){
    const modelo = {
      directive: this.formTicket.value.directive,
      descripcion: this.formTicket.value.descripcion,
      archivo: this.formTicket.value.archivo,
      user: this.formTicket.value.user,
      area: this.formTicket.value.area,
      piso: this.formTicket.value.piso,
      n_sala: this.formTicket.value.n_sala,
      n_consultorio: this.formTicket.value.n_consultorio,
      estado: this.formTicket.value.estado,
      // sarvey: this.formTicket.value.sarvey,
    }

    if (this.dataTickets === null) {
      this.ticketsService.save(modelo.user, modelo.directive, modelo).subscribe({
        next: (data)=> {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Ticket creado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close("creado");
        }, error:(e)=>{
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo crear el ticket. ' + e,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
    } else {
      this.ticketsService.update(this.dataTickets.id, modelo).subscribe({
        next: (data)=> {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Ticket editado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close("editado");
        }, error:(e)=>{
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo editar el ticket. ' + e,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
    }
  }

  ngOnInit(): void {
    if (this.dataTickets) {
      this.formTicket.patchValue({
        directive: this.dataTickets.directive.id,
        descripcion: this.dataTickets.descripcion,
        archivo: this.dataTickets.archivo,
        user: this.dataTickets.user.id,
        area: this.dataTickets.area,
        piso: this.dataTickets.piso,
        n_sala: this.dataTickets.n_sala,
        n_consultorio: this.dataTickets.n_consultorio,
        estado: this.dataTickets.estado,
        // sarvey: this.dataTickets.sarvey,
      });
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
      this.iconAccion = 'edit';
    }
  }

}
