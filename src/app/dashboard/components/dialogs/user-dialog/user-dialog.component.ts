import { UsuarioService } from '../../../services/users.service';
import { Component, OnInit, Inject, inject, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { Profile } from 'src/app/dashboard/interfaces/users';
import { Estableishment } from 'src/app/dashboard/interfaces/estableishments';
import { EstablecimientoService } from '../../../services/estableishments.service';

import Swal from 'sweetalert2'
import { ValidatorsService } from 'src/app/shared/service/validators.service';


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
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class UserDialogComponent implements OnInit {
  formUser: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  iconAccion: string = 'add_circle';
  listaEstableishment: Estableishment[] = [];
  private validatorsService = inject(ValidatorsService);

  constructor(
    private dialogReferencia: MatDialogRef<UserDialogComponent>,
    private fb: FormBuilder,
    private userService: UsuarioService,
    private estableishmentService: EstablecimientoService,
    @Inject(MAT_DIALOG_DATA) public dataUsuario: Profile
  ) {


    this.formUser = this.fb.group({
      usuario: ['', [Validators.required,Validators.minLength(10)] ],
      nombre: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
      sexo: ['', Validators.required],
      itinerancia: [''],
      nivel_institucional: ['', Validators.required],
      profesion: ['', Validators.required],
      etnia: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo_institucional: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      correo_personal: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      regimen_laboral: ['', Validators.required],
      modalidad_laboral: ['', Validators.required],
      nombramiento: ['', Validators.required],
      area_laboral: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      estableishment: ['', Validators.required],
    });
    this.estableishmentService.lista().subscribe(
      (data) => {
        this.listaEstableishment = data;
      },
      (err) => {}
    );
  }

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formUser, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formUser, field)
  }

  addUser() {
    console.log(this.formUser.value);
    const modelo = {
      usuario: this.formUser.value.usuario,
      nombre: this.formUser.value.nombre,
      sexo: this.formUser.value.sexo,
      nivel_institucional: this.formUser.value.nivel_institucional,
      itinerancia: this.formUser.value.itinerancia.toUpperCase(),
      profesion: this.formUser.value.profesion.toUpperCase,
      etnia: this.formUser.value.etnia,
      fecha_nacimiento: moment(this.formUser.value.fecha_nacimiento).format('YYYY-MM-DD'),
      telefono: this.formUser.value.telefono,
      direccion: this.formUser.value.direccion.toUpperCase(),
      correo_institucional: this.formUser.value.correo_institucional,
      correo_personal: this.formUser.value.correo_personal,
      regimen_laboral: this.formUser.value.regimen_laboral,
      modalidad_laboral: this.formUser.value.modalidad_laboral,
      nombramiento: this.formUser.value.nombramiento,
      area_laboral: this.formUser.value.area_laboral.toUpperCase(),
      fecha_ingreso: moment(this.formUser.value.fecha_ingreso).format('YYYY-MM-DD'),
      estableishment: this.formUser.value.estableishment,
    };

    if (this.dataUsuario === null) {
      this.userService.save(modelo.estableishment,modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Perfil del suario '+modelo.nombre+' creado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo crear el usuario. ' + e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    } else {
      this.userService.update(this.dataUsuario.id, modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Perfil del usuario '+modelo.nombre+' editado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('editado');
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
  }

  ngOnInit(): void {
    if (this.dataUsuario) {
      this.formUser.patchValue({
        usuario: this.dataUsuario.usuario,
        nombre: this.dataUsuario.nombre,
        sexo: this.dataUsuario.sexo,
        nivel_institucional: this.dataUsuario.nivel_institucional,
        itinerancia: this.dataUsuario.itinerancia,
        profesion: this.dataUsuario.profesion,
        etnia: this.dataUsuario.etnia,
        fecha_nacimiento: moment(this.dataUsuario.fecha_nacimiento, 'YYYY-MM-DD'),
        telefono: this.dataUsuario.telefono,
        direccion: this.dataUsuario.direccion,
        correo_institucional: this.dataUsuario.correo_institucional,
        correo_personal: this.dataUsuario.correo_personal,
        regimen_laboral: this.dataUsuario.regimen_laboral,
        modalidad_laboral: this.dataUsuario.modalidad_laboral,
        nombramiento: this.dataUsuario.nombramiento,
        area_laboral: this.dataUsuario.area_laboral,
        fecha_ingreso: moment(this.dataUsuario.fecha_ingreso, 'YYYY-MM-DD'),
        estableishment: this.dataUsuario.estableishment.id,
      });
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.iconAccion = 'edit';
    }
  }
}
