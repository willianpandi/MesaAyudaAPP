import { UserService } from '../../../services/users.service';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Estableishment } from '../../../../dashboard/interfaces/estableishments';
import { ValidatorsService } from '../../../../shared/service/validators.service';
import * as moment from 'moment';

import Swal from 'sweetalert2'

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
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
export class UserDialogComponent {

  formUser: FormGroup;
  hide = true;
  hide2 = true;
  maxDate: Date;

  opcionesEstado = [
    { valor: true, etiqueta: 'ACTIVO' },
    { valor: false, etiqueta: 'INACTIVO' }
  ];


  constructor(
    private dialogReferencia: MatDialogRef<UserDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private validatorsService: ValidatorsService,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.formUser = this.fb.group({
      usuario: ['', [Validators.required,Validators.minLength(10)] ],
      nombre: ['', [Validators.required]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      contrasenia2: ['', [Validators.required]],
      puesto: ['', Validators.required],
      g_Ocupacional: ['', Validators.required],
      m_contrato: ['', Validators.required],
      f_ingreso: ['', Validators.required],
      celular: ['', Validators.required],
      telefono: [''],
      c_Administrativo: [''],
      funciones_A: [''],
      correo_institucional: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      correo_personal: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      estado: ['', Validators.required],
      rol: ['', Validators.required],
    },
    {
      validators:
        this.validatorsService.isFielOneEqualFieldTwo(
          'contrasenia',
          'contrasenia2'
        ),
    });
    this.dateAdapter.setLocale('es');
    this.maxDate = new Date();
  }

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formUser, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formUser, field)
  }

  addUser() {
    const modelo = {
      usuario: this.formUser.value.usuario,
      nombre: this.formUser.value.nombre,
      contrasenia: this.formUser.value.contrasenia,
      puesto: this.formUser.value.puesto,
      g_Ocupacional: this.formUser.value.g_Ocupacional,
      m_contrato: this.formUser.value.m_contrato,
      f_ingreso: moment(this.formUser.value.f_ingreso).format('YYYY-MM-DD'),
      celular: this.formUser.value.celular,
      telefono: this.formUser.value.telefono,
      c_Administrativo: this.formUser.value.c_Administrativo,
      funciones_A: this.formUser.value.funciones_A,
      correo_institucional: this.formUser.value.correo_institucional,
      correo_personal: this.formUser.value.correo_personal,
      estado: this.formUser.value.estado,
      rol: this.formUser.value.rol,
    };
      this.userService.save(modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Usuario Creado',
            html: `Perfil del suario <strong>`+modelo.nombre+`</strong> creado correctamente.`,
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Usuario NO Creado',
            html: `No se pudo crear el usuario <strong>`+modelo.nombre+`</strong>. ` + e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });

    }
}
