import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../dashboard/services/tickets.service';
import { Category, SmallSubCategory } from '../../../dashboard/interfaces/category';
import { CategoryService } from '../../../dashboard/services/categories.service';
import { District, SmallEstableishment } from '../../../dashboard/interfaces/districts';
import { DistrictService } from '../../../dashboard/services/districts.service';
import { ValidatorsService } from '../../../shared/service/validators.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../../components/dialogs/ticket-dialog/ticket-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './open-page.component.html',
  styleUrls: ['./open-page.component.css']
})
export class OpenPageComponent implements OnInit {
  formTicket!: FormGroup;
  selectedFileName: any = null;
  listCategory: Category[] = [];
  listDistrict: District[] = [];

  estableishmetsByDistrict: SmallEstableishment[] = [];
  listSubcategoryByCategory: SmallSubCategory[] = [];

  ticketSatisfaccion: boolean = true;

  archivo: File | undefined;

  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFileName = files[0].name;
      this.archivo = files[0] as File;
    }
  }

  constructor(
    private fb: FormBuilder,
    private ticketsService: TicketService,
    private categoryService: CategoryService,
    private validatorsService: ValidatorsService,
    private districtService: DistrictService,
    public dialog: MatDialog,
  ){
    this.categoryService.lista().subscribe(
      (data) => {
        this.listCategory = data;
      },
      (err) => {}
    );
    this.districtService.lista().subscribe(
      (data) => {
        this.listDistrict = data;
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    this.formTicket = this.fb.group({
      cedula: ['', [Validators.required,Validators.minLength(10)]],
      nombre: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      telefono: ['', [Validators.required,Validators.minLength(10)]],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      requerimiento: ['', Validators.required],
      descripcion: ['', Validators.required],
      district: ['', Validators.required],
      estableishment: ['', Validators.required],
      area: ['', Validators.required],
      piso: [''],
      n_sala: [''],
      n_consultorio: [''],
    });
    this.onCategoryChanged();
    this.onEstableishmentsChanged();
  }

  onCategoryChanged(): void{
    this.formTicket.get('category')!.valueChanges
      .pipe(
        switchMap( category => this.categoryService.findSubcategories(category)),
      )
      .subscribe((subcategories) => {
        this.listSubcategoryByCategory = subcategories;
      });
  };

  onEstableishmentsChanged(): void{
    this.formTicket.get('district')!.valueChanges
      .pipe(
        switchMap( district => this.districtService.findEstableishments(district)),
      )
      .subscribe((estableishments) => {
        this.estableishmetsByDistrict = estableishments;
      });
  };


  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.formTicket, field);
  }

  getFieldError(field: string) {
    return this.validatorsService.getFieldError(this.formTicket, field);
  }

  isValidFieldUser(field: string) {
    return this.validatorsService.isValidField(this.formTicket, field);
  }

  getFieldErrorUser(field: string) {
    return this.validatorsService.getFieldError(this.formTicket, field);
  }

  crearTicket(){
    const dataTicket = this.formTicket.value;
    const { district, ...otherDate} = dataTicket;

    Swal.fire({
      title: 'Creando . . . ',
      allowOutsideClick: false,
      showConfirmButton: false,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    const saveSubscription = this.selectedFileName === null ?
      this.ticketsService.save(otherDate) :
      this.ticketsService.save(otherDate, this.archivo);

    saveSubscription.subscribe(
      (data) => {
        Swal.close();

        Swal.fire({
          title: `Ticket ${data.codigo} Creado`,
          icon: 'success',
          html: `<strong>Solicitud de Ticket de Ayuda ${data.codigo}</strong> creado correctamente, <strong>${data.soporteAsignado}</strong> se contactará con usted en breve si es necesario.`,
        });

        this.formTicket.reset();
        this.selectedFileName = null;
        this.estableishmetsByDistrict = [];
        this.listSubcategoryByCategory = [];

        this.onCategoryChanged();
        this.onEstableishmentsChanged();
      },
      (e) => {
        Swal.close();

        Swal.fire({
          title: 'Ticket No Creado',
          icon: 'error',
          html: `No se pudo crear el ticket. <strong>` + e + `</strong>`,
        });
      }
    );
  }

  resetTicket(){
    this.formTicket.reset();
  }

  viewTicket(cedula: string){
    this.dialog.open(TicketDialogComponent, {
      disableClose: true,
      width:"1000px",
      data: cedula
    }).afterClosed().subscribe(resultado => {
      if (resultado === "encuesta") {
      }
    })
  }

  searchUser(){
    const usuario = this.formTicket.value.cedula;
    Swal.fire({
      title: 'Cargando . . . ',
      allowOutsideClick: false,
      showConfirmButton: false,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading();
      }
    });
    this.ticketsService.search(usuario).subscribe({
      next:(data) =>{
        Swal.close();

        this.formTicket.patchValue({
          cedula: data.cedula,
          nombre: data.nombre,
          correo_electronico: data.correo_electronico,
          telefono: data.telefono,
        })
        if (data.estado === 'CERRADO' && data.satisfaccion === null) {
          Swal.fire({
            title: 'Encuesta de Satisfacción NO Realizada!',
            icon: 'warning',
            html: `Por favor, realice la/las encuesta de satisfacción de sus últimos ticket CERRADOS. Revise su Historial de Tickets.`,
          });
          this.ticketSatisfaccion = false;
        } else {
          this.ticketSatisfaccion = true;
        }
      },
      error: (e) => {
        Swal.close();

        Swal.fire({
          title: 'Usuario NO Encontrado',
          icon: 'error',
          text: 'No se pudo encontrar los datos del usuario con el número de cédula ingresado. Por favor ingrese sus datos.',
        });
        this.formTicket.get('nombre')?.setValue(null);
        this.formTicket.get('correo_electronico')?.setValue(null);
        this.formTicket.get('telefono')?.setValue(null);
      }
    })
  }

}
