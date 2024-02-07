import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectivaService } from '../../services/directives.service';
import { Directive } from '../../interfaces/directives';
import Swal from 'sweetalert2';
import { TicketService } from '../../services/tickets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket, Files } from '../../interfaces/tickets';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from 'src/app/service/ImageService.service';
import { ImageDialogComponent } from '../../components/dialogs/image-dialog/image-dialog.component';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { Profile } from '../../interfaces/users';
import { UsuarioService } from '../../services/users.service';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.css'],
})
export class TicketPageComponent implements OnInit {
  formTicket!: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  codigoTicket!: number;
  listaDirective: Directive[] = [];
  listaSoporte: Profile[] = [];
  iconAccion: string = 'add_circle';
  mostrarInput = false;
  ticketSelect!: Ticket;
  archivos: Files[] = [];
  ticketNuevo = false;
  selectedFileName: any = null;
  archivo!: File;

  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFileName = files[0].name;
      this.archivo = files[0];
    }
  }

  constructor(
    private fb: FormBuilder,
    private ticketsService: TicketService,
    private directiveService: DirectivaService,
    private userService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private archivoService: ImageService,
    public dialog: MatDialog,
    private router: Router,
    private validatorsService: ValidatorsService
  ) {
    this.directiveService.lista().subscribe(
      (data) => {
        this.listaDirective = data;
      },
      (err) => {}
    );
    this.userService.listaSoporte().subscribe(
      (data) => {
        this.listaSoporte = data;
      },
      (err) => {}
    );
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.formTicket, field);
  }

  getFieldError(field: string) {
    return this.validatorsService.getFieldError(this.formTicket, field);
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  }

  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl },
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id !== 'nuevo') {
        this.cargarTicket(id);
        this.ticketNuevo = true;
      }
    });
    this.formTicket = this.fb.group({
      descripcion: ['', Validators.required],
      titulo: ['', Validators.required],
      estado: ['ABIERTO'],
      directive: ['', Validators.required],
      area: ['', Validators.required],
      piso: [''],
      n_sala: [''],
      n_consultorio: [''],
      soporteUser: ['', Validators.required],
    });
  }

  guardarTicket() {
    if (this.ticketSelect) {
      const codigo = this.ticketSelect.codigo;
      this.ticketsService
        .update(this.ticketSelect.id, this.formTicket.value)
        .subscribe({
          next: (data) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              text: `Ticket ${codigo}, editado correctamente`,
              showConfirmButton: false,
              timer: 2500,
            });
            this.router.navigateByUrl(`dashboard/tickets`);
          },
          error: (e) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'error',
              text: 'No se pudo editar el ticket. ' + e,
              showConfirmButton: false,
              timer: 2500,
            });
          },
        });
    } else {
      this.ticketsService.save(this.formTicket.value, this.archivo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Ticket creado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          this.router.navigateByUrl(`dashboard/tickets`);
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo crear el ticket. ' + e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    }
  }
  cargarTicket(id: string) {
    this.ticketsService.detail(id).subscribe((ticket) => {
      const {
        descripcion,
        titulo,
        area,
        estado,
        piso,
        n_sala,
        n_consultorio,
        directive: { id: directiveId },
        soporteUser: { id: soporteId },
      } = ticket;
      this.ticketSelect = ticket;
      console.log(this.ticketSelect);
      this.archivoService.getImages(this.ticketSelect.id).subscribe((data) => {
        this.archivos = data;
      });
      this.codigoTicket = this.ticketSelect.codigo;
      this.formTicket.setValue({
        descripcion,
        titulo,
        area,
        estado,
        piso,
        n_sala,
        n_consultorio,
        directive: directiveId,
        soporteUser: soporteId,
      });
    });
    this.tituloAccion = 'Editar';
    this.botonAccion = 'Actualizar';
    this.iconAccion = 'edit';
    this.mostrarInput = true;
  }
}
