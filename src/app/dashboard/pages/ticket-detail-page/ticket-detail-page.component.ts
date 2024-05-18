import { Component, OnInit, AfterViewInit, ViewChild, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuillEditorComponent } from 'ngx-quill';

import { ImageDialogComponent } from '../../components/dialogs/image-dialog/image-dialog.component';
import { TicketService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/tickets';
import { AuthService } from '../../../auth/services/auth.service';
import { ReassignedTicketsComponent } from '../../components/dialogs/reassigned-tickets/reassigned-tickets.component';
import { FormControl } from '@angular/forms';
import { ChangeTicketComponent } from '../../components/dialogs/change-ticket/change-ticket.component';
import { CreateTicketComponent } from '../../components/dialogs/create-ticket/create-ticket.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-detail-page',
  templateUrl: './ticket-detail-page.component.html',
  styleUrls: ['./ticket-detail-page.component.css'],
})
export class TicketDetailPageComponent implements OnInit, AfterViewInit {
  ticketSelect!: Ticket;
  quillEditorReadOnly = true;
  quillEditorReadOnly2 = false;

  private authService = inject( AuthService);
  public user = computed(()=> this.authService.currentUser());

  commentSupport = new FormControl();

  constructor(
    private ticketsService: TicketService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {}

  @ViewChild('quillEditor1')
  quillEditor1!: QuillEditorComponent;

  @ViewChild('quillEditor2') quillEditor2!: QuillEditorComponent;

  ngAfterViewInit(): void {
    if (this.ticketSelect) {
      const descripcion = this.ticketSelect.descripcion;
      const comentario = this.ticketSelect.soporteComentario;
      if (descripcion) {
        this.quillEditor1.content = descripcion;
      }
      if (comentario) {
        this.quillEditor2.content = comentario;
      }
    }
    if (this.ticketSelect.estado === 'CERRADO') {
      this.quillEditorReadOnly2 = true;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarTicket(id);
    });

  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  }

  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl },
    });
  }

  cargarTicket(id: string) {
    this.ticketsService.detail(id).subscribe((ticket) => {
      this.ticketSelect = ticket;
    });

  }

  reasignarTicket(id: string){
    this.dialog.open(ReassignedTicketsComponent, {
      disableClose: true,
      width:"600px",
      data: id
    }).afterClosed().subscribe(resultado => {
      if (resultado === "reasignado") {
        this.cargarTicket(id);
      }
    })
  }

  guardarComentario(id: string){
    const modelo = {
      soporteComentario: this.commentSupport.value
    }
    this.ticketsService.update(id, modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Comentario Guardado',
          html: `Comentario guardado correctamente.`,
          showConfirmButton: false,
          timer: 2500,
        });
        this.cargarTicket(this.ticketSelect.id)
      },
      error: (e) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Comentario NO Guardado',
          html: `No se pudo guardar el comentario correctamente. ` + e,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    })
  }

  crearTicket(id: string){
    this.dialog.open(CreateTicketComponent, {
      disableClose: true,
      width:"800px",
      data: id,
    }).afterClosed().subscribe(resultado => {
      if (resultado === "crear") {
        this.cargarTicket(id);
      }
    })
  }

  enProcesoTicket() {
    const modelo = {
      estado: 'EN PROCESO'
    }
    Swal.fire({
      title: '¿EN PROCESO?',
      html: `¿Estás seguro de cambiar el estado del <strong>Ticket ` + this.ticketSelect.codigo +`</strong> a <strong>EN PROCESO</strong>.`,
      icon: 'question',
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'Si, cambiar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#FF5252',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiando . . . ',
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
              `Ticket `+ this.ticketSelect.codigo +` en Proceso!`,
              `El <strong>Ticket ` + this.ticketSelect.codigo +`</strong> ha sido cambiado a estado <strong>EN PROCESO</strong>.`,
              'success'
            );
            this.cargarTicket(this.ticketSelect.id)
          },
          error: (message) => {
            Swal.close();
            Swal.fire('Error', `No se ha podido cerrar el <strong>Ticket ` + this.ticketSelect.codigo +`</strong>.`, 'error');
          },
        });
      }
    });

  }

  cerrarTicket() {
    const modelo = {
      estado: 'CERRADO'
    }
    Swal.fire({
      title: '¿CERRAR?',
      html: `¿Estás seguro de <strong>CERRAR</strong> el <strong>Ticket ` + this.ticketSelect.codigo +`</strong> recuerde que si lo cierra no se podra reabrir.`,
      icon: 'question',
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'Si, Cerrar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#FF5252',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cerrando . . . ',
          allowOutsideClick: false,
          showConfirmButton: false,
          timerProgressBar: true,
          willOpen: () => {
            Swal.showLoading();
          }
        });
        this.ticketsService.updateCloseTicket(this.ticketSelect.id, modelo).subscribe({
          next: (data) => {
            Swal.close();
            Swal.fire(
              `Ticket ` + this.ticketSelect.codigo +` Cerrado!`,
              `El <strong>Ticket ` + this.ticketSelect.codigo +`</strong> ha sido cerrado correctamente.`,
              'success'
            );
            this.cargarTicket(this.ticketSelect.id)
          },
          error: (message) => {
            Swal.close();
            Swal.fire('Error', `No se ha podido cerrar el <strong>Ticket ` + this.ticketSelect.codigo +`</strong>.`, 'error');
          },
        });
      }
    });
  }

  cambiarDepartamento(id: string){
    this.dialog.open(ChangeTicketComponent, {
      disableClose: true,
      width:"800px",
      data: id,
    }).afterClosed().subscribe(resultado => {
      if (resultado === "cambiar") {
        this.cargarTicket(id);
      }
    })
  }
}
