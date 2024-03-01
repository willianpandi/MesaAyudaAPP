import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { MatDialog } from '@angular/material/dialog';
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

  login(){
    const { username, password } = this.formLogin.value;

    this.authService.login(username, password)
      .subscribe(  {
        next: () => {this.router.navigateByUrl('/dashboard'), this.formLogin.reset();},

        error: (message) => {
          Swal.fire({
          title: 'Credenciales Invalidas',
          icon: 'error',
          html: `Por favor, ingrese correctamente sus credenciales. <strong>`+message+`</strong>`,
        })
        }
      })
  }
}

