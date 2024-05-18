import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/service/validators.service';
import Swal from 'sweetalert2'

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

  login(){
    const { username, password } = this.formLogin.value;
    Swal.fire({
      title: 'Cargando . . . ',
      allowOutsideClick: false,
      showConfirmButton: false,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading();
      }
    });
    this.authService.login(username, password)
      .subscribe(  {
        next: () => {Swal.close(); this.router.navigateByUrl('/dashboard'), this.formLogin.reset();},

        error: (err) => {
          Swal.close();

          if (err === undefined) {
            Swal.fire({
              title: 'Error de Servidor',
              icon: 'error',
              html: `<strong>API NO DISPONIBLE</strong> en este momento. Por favor, inténtalo de nuevo más tarde.`,
            })
          } else {
            Swal.fire({
              title: 'Credenciales Invalidas',
              icon: 'error',
              html: `Por favor, ingrese correctamente sus credenciales. <strong>`+err+`</strong>`,
            })
          }
        }
      })
  }
}

