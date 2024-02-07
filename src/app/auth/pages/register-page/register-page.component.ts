import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estableishment} from 'src/app/dashboard/interfaces/estableishments';
import { EstablecimientoService } from 'src/app/dashboard/services/estableishments.service';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { DistritoService } from 'src/app/dashboard/services/districts.service';
import { District, SmallDistrict } from 'src/app/dashboard/interfaces/districts';
import { MatDialogRef } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs';
// import { ValidatorsService } from 'src/app/shared/services/validators.service';
// import { EmailValidator } from 'src/app/shared/validators/email-validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  hide = true;
  hide2 = true;
  // hide2 = true;
  estableishmetsByDistrict: SmallDistrict[] = [];
  listaDistrict: District[] = [];
  private validatorsService = inject(ValidatorsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  formRegisterUser: FormGroup = this.fb.group(
    {
      usuario: ['', [Validators.required, Validators.minLength(10)]],
      // nombre: ['',[Validators.required,Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
      nombre: ['',[Validators.required]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      contrasenia2: ['', [Validators.required]],
      district: ['', [Validators.required]],
      estableishment: ['', [Validators.required]],
    },
    {
      validators:
        this.validatorsService.isFielOneEqualFieldTwo(
          'contrasenia',
          'contrasenia2'
        ),
    }
  );

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.formRegisterUser, field);
  }

  getFieldError(field: string) {
    return this.validatorsService.getFieldError(this.formRegisterUser, field);
  }

  constructor(
    private dialogReferencia: MatDialogRef<RegisterPageComponent>,
    private estableishmentService: EstablecimientoService,
    private districtService: DistritoService,
    private userService: AuthService
  ) {
    this.districtService.lista().subscribe(
      (data) => {
        this.listaDistrict = data;
      },
      (err) => {}
    );
  }
  ngOnInit(): void {
    this.onDistrictChanged();
  }

  onDistrictChanged(): void{
    this.formRegisterUser.get('district')?.valueChanges
      .pipe(
        // tap( ()=> this.formRegisterUser.get('estableishment')!.setValue('') ),
        switchMap( district => this.districtService.detail(district)),
      )
      .subscribe((estableishments) => {
        this.estableishmetsByDistrict = estableishments;
      });
  }

  onSave(): void {
    const modelo = {
      usuario: this.formRegisterUser.value.usuario,
      nombre: this.formRegisterUser.value.nombre,
      contrasenia: this.formRegisterUser.value.contrasenia,
      estableishment: this.formRegisterUser.value.estableishment,
    };
    this.userService.register(modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          text: 'Perfil del suario ' + modelo.nombre + ' creado correctamente',
          showConfirmButton: false,
          timer: 2500,
        });
        this.dialogReferencia.close('creado');
      },
      error: (message) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          text: 'No se pudo crear el usuario. ' + message,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    });
    // this.formRegisterUser.reset();
  }
}
