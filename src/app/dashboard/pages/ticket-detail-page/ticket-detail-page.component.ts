import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../../components/dialogs/image-dialog/image-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../services/tickets.service';
import { ImageService } from 'src/app/service/ImageService.service';
import { Files, Ticket, TicketDetalle } from '../../interfaces/tickets';
import { DirectivaService } from '../../services/directives.service';
import { Directive } from '../../interfaces/directives';
import { ActivatedRoute } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-ticket-detail-page',
  templateUrl: './ticket-detail-page.component.html',
  styleUrls: ['./ticket-detail-page.component.css'],
})
export class TicketDetailPageComponent implements OnInit, AfterViewInit {
  ticketSelect!: Ticket;
  archivos: Files[] = [];
  ticketDetalle: TicketDetalle[] = [];
  listaDirective: Directive[] = [];
  quillEditorReadOnly = false;
  formTicketDetalle!: FormGroup;

  constructor(
    private ticketsService: TicketService,
    private archivoService: ImageService,
    private directiveService: DirectivaService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.directiveService.lista().subscribe(
      (data) => {
        this.listaDirective = data;
      },
      (err) => {}
    );
  }

  @ViewChild(QuillEditorComponent, { static: false })
  quillEditor!: QuillEditorComponent;
  ngAfterViewInit(): void {
    if (this.ticketSelect) {
      const descripcion = this.ticketSelect.descripcion;
      if (descripcion) {
        this.quillEditor.content = descripcion;
      }
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarTicket(id);
    });
    this.formTicketDetalle = this.fb.group({
      detalle: ['', Validators.required],
    })
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
      this.archivoService.getImages(this.ticketSelect.id).subscribe((data) => {
        this.archivos = data;
      });
      this.ticketsService.listaDetalle(this.ticketSelect.id).subscribe((data) => {
      this.ticketDetalle = data;
    })
    });
  }

  responderTicket(){
    this.ticketsService.saveDetalle(this.ticketSelect.id, this.formTicketDetalle.value)
    .subscribe({
      next: (data) =>{this.formTicketDetalle.reset()},
      error: (e) => {},
    })
  }

  cerrarTicket() {
    this.quillEditorReadOnly = true
  }
}
