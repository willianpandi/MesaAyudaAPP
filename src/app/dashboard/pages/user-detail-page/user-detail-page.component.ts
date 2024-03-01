import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { UserService } from '../../services/users.service';
import { User } from '../../interfaces/users';
import { District, SmallEstableishment } from '../../../dashboard/interfaces/districts';
import { DistrictService } from '../../../dashboard/services/districts.service';
import { Estableishment } from '../../interfaces/estableishments';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/categories.service';

import Swal from 'sweetalert2';
import * as moment from 'moment';

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
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class UserDetailPageComponent implements OnInit {
  userSelect!: User;
  formUserDetail!: FormGroup;
  estableishmetsByDistrict: SmallEstableishment[] = [];
  listaDistrict: District[] = [];
  listaCategory: Category[] = [];
  listEstablesihments: Estableishment[] = [];
  listCategories: Category[] = [];
  maxDate: Date;

  opcionesEstado = [
    { valor: true, etiqueta: 'ACTIVO' },
    { valor: false, etiqueta: 'INACTIVO' }
  ];

  formDistrictEstableishments: FormGroup = this.fb.group(
    {
      district: ['', [Validators.required]],
      estableishment: ['', [Validators.required]],
    },
  );

  formEstableishmentsUser: FormGroup = this.fb.group(
    {
      estableishment: ['', [Validators.required]],
    },
  );

  formCategories: FormGroup = this.fb.group(
    {
      category: ['', [Validators.required]],
    },
  );

  formCategoriesUser: FormGroup = this.fb.group(
    {
      category: ['', [Validators.required]],
    },
  );

  constructor(
    private validatorsService: ValidatorsService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private districtService: DistrictService,
    private categoryService: CategoryService,
    private dateAdapter: DateAdapter<Date>,
  ){
    this.formUserDetail = this.fb.group({
      usuario: ['', [Validators.required,Validators.minLength(10)] ],
      nombre: ['', [Validators.required]],
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
      observaciones: [''],
    });
    this.districtService.lista().subscribe(
      (data) => {
        this.listaDistrict = data;
      },
      (err) => {}
    );
    this.categoryService.lista().subscribe(
      (data) => {
        this.listaCategory = data;
      },
      (err) => {}
    );
    this.dateAdapter.setLocale('es');
    this.maxDate = new Date();
  }
  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formUserDetail, field)
  }
  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formUserDetail, field)
  }

  isValidFieldAdd( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formDistrictEstableishments, field)
  }
  getFieldErrorAdd( field: string ) {
    return this.validatorsService.getFieldError(this.formDistrictEstableishments, field)
  }

  isValidFieldAddC( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formCategories, field)
  }
  getFieldErrorAddC( field: string ) {
    return this.validatorsService.getFieldError(this.formCategories, field)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarUser(id);
    });
    this.onDistrictChanged();
  }

  updateUser(){
    const modelo = {
      usuario: this.formUserDetail.value.usuario,
      nombre: this.formUserDetail.value.nombre,
      puesto: this.formUserDetail.value.puesto,
      g_Ocupacional: this.formUserDetail.value.g_Ocupacional,
      m_contrato: this.formUserDetail.value.m_contrato,
      f_ingreso: moment(this.formUserDetail.value.f_ingreso).format('YYYY-MM-DD'),
      celular: this.formUserDetail.value.celular,
      telefono: this.formUserDetail.value.telefono,
      c_Administrativo: this.formUserDetail.value.c_Administrativo,
      funciones_A: this.formUserDetail.value.funciones_A,
      correo_institucional: this.formUserDetail.value.correo_institucional,
      correo_personal: this.formUserDetail.value.correo_personal,
      estado: this.formUserDetail.value.estado,
      rol: this.formUserDetail.value.rol,
      observaciones: this.formUserDetail.value.observaciones,
    };
    this.userService.update(this.userSelect.id, modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Perfil Actualizado',
          html: `Perfil del usuario <strong>`+modelo.nombre+`</strong> actualizado correctamente.`,
          showConfirmButton: false,
          timer: 2000,
        });
      },
      error: (e) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Perfil NO Actualizado',
          html: `No se pudo actualizar los datos del usuario <strong>`+modelo.nombre+`</strong>. Recuerde que los <strong>correos electrónicos</strong> deben ser unicos para cada usuario.`,
          showConfirmButton: false,
          timer: 2000,
        });
      },
    });
  }

  resetPass() {
    this.userService.resetPassword(this.userSelect.id, this.userSelect.usuario).subscribe({
      next: () => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Contraseña Reseteada',
          text: 'Contraseña reseteada, la contraseña nueva es el número de cédula.',
          showConfirmButton: false,
          timer: 2000,
        });
      },
      error: (e) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Contraseña NO Reseteada',
          text: 'No se pudo resetear la contraseña.',
          showConfirmButton: false,
          timer: 2000,
        });
      },
    })
  }


  cargarUser(id: string) {
    this.userService.detail(id).subscribe((user) => {
      this.userSelect = user;
      if (this.userSelect) {
        this.formUserDetail.patchValue({
          usuario: this.userSelect.usuario,
          nombre: this.userSelect.nombre,
          puesto: this.userSelect.puesto,
          g_Ocupacional: this.userSelect.g_Ocupacional,
          m_contrato: this.userSelect.m_contrato,
          f_ingreso: this.userSelect.f_ingreso,
          celular: this.userSelect.celular,
          telefono: this.userSelect.telefono,
          c_Administrativo: this.userSelect.c_Administrativo,
          funciones_A: this.userSelect.funciones_A,
          correo_institucional: this.userSelect.correo_institucional,
          correo_personal: this.userSelect.correo_personal,
          estado: this.userSelect.estado,
          rol: this.userSelect.rol,
          observaciones: this.userSelect.observaciones,
        });
      };
      this.userService.listaEstableishments(this.userSelect.id).subscribe({
        next: (data) => {
          this.listEstablesihments = data;
        },
        error: (message) => {}
      });
      this.userService.listaCategories(this.userSelect.id).subscribe({
        next: (data) => {
          this.listCategories = data;
        },
        error: (message) => {}
      });
    });
  };

  onDistrictChanged(): void{
    this.formDistrictEstableishments.get('district')?.valueChanges
      .pipe(
        switchMap( district => this.districtService.findEstableishments(district)),
      )
      .subscribe((estableishments) => {
        this.estableishmetsByDistrict = estableishments;
      });
  };

  relationEstableishment(): void{
    const modelo = {
      estableishment: this.formDistrictEstableishments.value.estableishment,
    };
    this.userService.addEstableishment(this.userSelect.id, modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Unidad/Gestión Relacionado',
          html: `Unidad/Gestión relacionado correctamente con el usuario.`,
          showConfirmButton: false,
          timer: 2000,
        });
        this.listEstablesihments = data;
        this.formDistrictEstableishments.get('estableishment')!.reset();
      },
      error: (message) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Unidad/Gestión NO Relacionado',
          html: `No se pudo asignar la Unidad/Gestión. ` + message,
          showConfirmButton: false,
          timer: 2000,
        });
        this.formDistrictEstableishments.get('estableishment')!.reset();
      },
    });
  }

  deleteRealationEstableishment(){
    const modelo = {
      estableishment: this.formEstableishmentsUser.value.estableishment[0],
    };
    Swal.fire({
      title: 'ADVERTENCIA',
      html: `¿Estás seguro de quitar la relación?`,
      icon: 'warning',
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'Si, Quitar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeEstableishment(this.userSelect.id, modelo).subscribe({
          next: (data) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'Unidad/Gestión Quitada',
              html: `Unidad/Gestión quitada correctamente.`,
              showConfirmButton: false,
              timer: 2000,
            });
            this.listEstablesihments = data;
          },
          error: (message) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'error',
              title: 'Unidad/Gestión NO Quitada',
              html: `No se pudo quitar la relacion del Unidad/Gestión. ` + message,
              showConfirmButton: false,
              timer: 2000,
            });
          },
        });
      }
    });
  }

  relationCategory(): void{
    const modelo = {
      category: this.formCategories.value.category,
    };
    this.userService.addCategory(this.userSelect.id, modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Categoría Relacionada',
          html: `Categoría relacionado correctamente con el usuario.`,
          showConfirmButton: false,
          timer: 2000,
        });
        this.listCategories = data;
        this.formDistrictEstableishments.get('estableishment')!.reset();
      },
      error: (message) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Categoría NO Relacionada',
          html: `No se pudo asignar la categoría. ` + message,
          showConfirmButton: false,
          timer: 2000,
        });
        this.formDistrictEstableishments.get('estableishment')!.reset();
      },
    });
  }

  deleteRealationCategory(){
    const modelo = {
      category: this.formCategoriesUser.value.category[0],
    };
    Swal.fire({
      title: 'ADVERTENCIA',
      html: `¿Estás seguro de quitar la relación?`,
      icon: 'warning',
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'Si, Quitar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeCategoryt(this.userSelect.id, modelo).subscribe({
          next: (data) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'Categoría Quitada',
              html: `Categoría quitada correctamente.`,
              showConfirmButton: false,
              timer: 2000,
            });
            this.listCategories = data;
          },
          error: (message) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'error',
              title: 'Categoría NO Quitada',
              html: `No se pudo quitar la relacion de la categoría. ` + message,
              showConfirmButton: false,
              timer: 2000,
            });
          },
        });
      }
    });
  }

}
