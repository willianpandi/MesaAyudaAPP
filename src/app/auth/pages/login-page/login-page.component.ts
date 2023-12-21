import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPageComponent } from '../register-page/register-page.component';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(
    ){}
    private fb = inject( FormBuilder );
    private authService = inject(AuthService);
    private router = inject( Router);
    private dialog = inject( MatDialog );
    private validatorsService = inject(ValidatorsService);
  hide = true;


  public formLogin: FormGroup = this.fb.group({
    username:     ['', [ Validators.required, Validators.minLength(10) ]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formLogin, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formLogin, field)
  }

  // getFieldError( field: string ): string | null {
  //   if ( !this.formLogin.controls[field] ) return null;

  //   const errors = this.formLogin.controls[field].errors || {};

  //   for (const key of Object.keys(errors)) {
  //     switch( key ){
  //       case 'required':
  //         return 'Este campo es requerido';

  //       case 'minlength':
  //         return `Minimo ${ errors['minlength'].requiredLength} caracteres.`;
  //     }

  //   }
  //   return null;
  // }


  login(){
    const { username, password } = this.formLogin.value;

    this.authService.login(username, password)
      .subscribe(  {
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire('Error', message, 'error')
        }
      })

    this.formLogin.reset();
  }

  register(){
    this.dialog.open(RegisterPageComponent, {
      disableClose: true,
      width:"800px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
      }
    })
  }
}

