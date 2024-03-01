import { Component, OnInit } from '@angular/core';
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

@Component({
  templateUrl: './open-page.component.html',
  styleUrls: ['./open-page.component.css']
})
export class OpenPageComponent implements OnInit{
  formTicket!: FormGroup;
  selectedFileName: any = null;
  listCategory: Category[] = [];
  listDistrict: District[] = [];

  estableishmetsByDistrict: SmallEstableishment[] = [];
  listSubcategoryByCategory: SmallSubCategory[] = [];

  ticketSatisfaccion: boolean = true;

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
      estado: ['ABIERTO'],
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
    this.formTicket.get('category')?.valueChanges
      .pipe(
        switchMap( category => this.categoryService.findSubcategories(category)),
      )
      .subscribe((subcategories) => {
        this.listSubcategoryByCategory = subcategories;
      });
  };

  onEstableishmentsChanged(): void{
    this.formTicket.get('district')?.valueChanges
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
    console.log(otherDate);

    const cedula = dataTicket.cedula;
    const nombre = dataTicket.nombre;
    const correo_electronico = dataTicket.correo_electronico;
    const telefono = dataTicket.telefono;
    const districts = dataTicket.district;
    const estableishment = dataTicket.estableishment;
    this.ticketsService.save(otherDate, this.archivo).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Ticket Creado',
          icon: 'success',
          html: `<strong>Solicitud de Ticket de Ayuda</strong> creado correctamente, <strong>`+ data.soporteAsignado +`</strong> se contactará con usted en breve si es necesario.`,
        });

        this.formTicket.reset({
          cedula: cedula,
          nombre: nombre,
          correo_electronico: correo_electronico,
          telefono: telefono,
          district: districts,
          estableishment:estableishment,
          estado: 'ABIERTO',
        });
      },
      error: (e) => {
        Swal.fire({
          title: 'Ticket No Creado',
          icon: 'error',
          text: 'No se pudo crear el ticket. ' + e,
        });
      },
    })
  }

  resetTicket(){
    this.formTicket.reset({
      estado: 'ABIERTO',
    });
  }

  viewTicket(cedula: string){
    this.dialog.open(TicketDialogComponent, {
      disableClose: true,
      width:"1000px",
      data: cedula
    })
  }

  searchUser(){
    const usuario = this.formTicket.value.cedula;

    this.ticketsService.search(usuario).subscribe({
      next:(data) =>{
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
