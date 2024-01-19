import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from '../../services/users.service';
import { ImageService } from 'src/app/service/ImageService.service';
import { Estableishment } from '../../interfaces/estableishments';
import { EstablecimientoService } from '../../services/estableishments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import Swal from 'sweetalert2'



export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Formato para parsear la entrada de fecha
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Formato de visualización de fecha
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-setting',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class SettingsPageComponent implements OnInit {
  private imageService = inject( ImageService);
  imageUrl: string = '';
  hide = true;
  hide2 = true;
  hide3 = true;
  formSettingsUser: FormGroup;
  user: any;
  listaEstableishment: Estableishment[] = [];
  private validatorsService = inject(ValidatorsService);
  private fb = inject(FormBuilder)
  private userService = inject(UsuarioService)

  private authService = inject( AuthService);
  // public user = computed(()=> this.authService.currentUser());

  private estableishmentService = inject( EstablecimientoService );

    formUpdatePassword: FormGroup = this.fb.group({
      contrasenia: ['', [Validators.required]],
      newcontrasenia: ['', [Validators.required, Validators.minLength(6)]],
      newcontrasenia2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsService.isFielOneEqualFieldTwo(
          'newcontrasenia',
          'newcontrasenia2'
        ),
      ],
    });

    isValidField(field: string) {
      return this.validatorsService.isValidField(this.formUpdatePassword, field);
    }

    getFieldError(field: string) {
      return this.validatorsService.getFieldError(this.formUpdatePassword, field);
    }

  constructor(

  ){
    this.user = this.authService.currentUser();
    this.formSettingsUser = this.fb.group({
      usuario: [this.user?.usuario, [Validators.required,Validators.minLength(10)]],
      nombre: [this.user?.nombre, [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
      sexo: [this.user?.sexo, Validators.required],
      itinerancia: [this.user?.itinerancia],
      nivel_institucional: [this.user?.nivel_institucional, Validators.required],
      profesion: [this.user?.profesion, Validators.required],
      etnia: [this.user?.etnia, Validators.required],
      fecha_nacimiento: [this.user?.fecha_nacimiento, Validators.required],
      telefono: [this.user?.telefono, Validators.required],
      direccion: [this.user?.direccion, Validators.required],
      correo_institucional: [this.user?.correo_institucional, [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      correo_personal: [this.user?.correo_personal, [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      regimen_laboral: [this.user?.regimen_laboral, Validators.required],
      modalidad_laboral: [this.user?.modalidad_laboral, Validators.required],
      nombramiento: [this.user?.nombramiento],
      area_laboral: [this.user?.area_laboral, Validators.required],
      fecha_ingreso: [this.user?.fecha_ingreso, Validators.required],
      estableishment: [this.user?.estableishment?.id, Validators.required],
    });

    this.estableishmentService.lista().subscribe(
      (data) => {
        this.listaEstableishment = data;
      },
      (err) => {}
    );

  }
  ngOnInit(): void {
    // this.image();
    // this.user = this.authService.currentUser();
    // this.formSettingsUser = this.fb.group({
    //   usuario: [this.user?.usuario, [Validators.required,Validators.minLength(10)]],
    //   nombre: [this.user?.nombre, [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    //   sexo: [this.user?.sexo, Validators.required],
    //   itinerancia: [this.user?.itinerancia],
    //   nivel_institucional: [this.user?.nivel_institucional, Validators.required],
    //   profesion: [this.user?.profesion, Validators.required],
    //   etnia: [this.user?.etnia, Validators.required],
    //   fecha_nacimiento: [this.user?.fecha_nacimiento, Validators.required],
    //   telefono: [this.user?.telefono, Validators.required],
    //   direccion: [this.user?.direccion, Validators.required],
    //   correo_institucional: [this.user?.correo_institucional, Validators.required, Validators.pattern(this.validatorsService.emailPattern)],
    //   correo_personal: [this.user?.correo_personal, Validators.required, Validators.pattern(this.validatorsService.emailPattern)],
    //   regimen_laboral: [this.user?.regimen_laboral, Validators.required],
    //   modalidad_laboral: [this.user?.modalidad_laboral, Validators.required],
    //   nombramiento: [this.user?.nombramiento],
    //   area_laboral: [this.user?.area_laboral, Validators.required],
    //   fecha_ingreso: [this.user?.fecha_ingreso, Validators.required],
    //   estableishment: [this.user?.estableishment?.id, Validators.required],
    // });
  }

  image(){
    this.imageService.setImageUrl('assets/images/mesa_ayuda.jpg')
  }


  UpdateUser(){
    console.log(this.formSettingsUser.value);

    const modelo = {
      usuario: this.formSettingsUser.value.usuario,
      nombre: this.formSettingsUser.value.nombre,
      sexo: this.formSettingsUser.value.sexo,
      nivel_institucional: this.formSettingsUser.value.nivel_institucional,
      itinerancia: this.formSettingsUser.value.itinerancia,
      profesion: this.formSettingsUser.value.profesion,
      etnia: this.formSettingsUser.value.etnia,
      fecha_nacimiento: moment(this.formSettingsUser.value.fecha_nacimiento).format('YYYY-MM-DD'),
      telefono: this.formSettingsUser.value.telefono,
      direccion: this.formSettingsUser.value.direccion,
      correo_institucional: this.formSettingsUser.value.correo_institucional,
      correo_personal: this.formSettingsUser.value.correo_personal,
      regimen_laboral: this.formSettingsUser.value.regimen_laboral,
      modalidad_laboral: this.formSettingsUser.value.modalidad_laboral,
      nombramiento: this.formSettingsUser.value.nombramiento,
      area_laboral: this.formSettingsUser.value.area_laboral,
      fecha_ingreso: moment(this.formSettingsUser.value.fecha_ingreso).format('YYYY-MM-DD'),
      estableishment: this.formSettingsUser.value.estableishment,
      estado: this.formSettingsUser.value.estado,
    };

    this.userService.update(this.user.id, modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          text: 'Perfil del usuario '+modelo.nombre+' editado correctamente',
          showConfirmButton: false,
          timer: 2500,
        });
      },
      error: (e) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          text: 'No se pudo editar los datos del usuario '+modelo.nombre +'. '+ e,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    });

  }
  UpdatePassword(){

  }



}
