import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/users.service';
import { ImageService } from '../../../service/ImageService.service';
import { Estableishment } from '../../interfaces/estableishments';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-setting',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {

  private imageService = inject( ImageService);
  hide = true;
  hide2 = true;
  hide3 = true;
  formSettingsUser: FormGroup;
  user: any;
  adminUser!: boolean;
  listaEstableishment: Estableishment[] = [];
  private validatorsService = inject(ValidatorsService);
  private fb = inject(FormBuilder)
  private userService = inject(UserService)

  private authService = inject( AuthService);

  selectedFileName: any = null;
  archivo!: File;

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
    if (this.user.rol === 'ADMINISTRADOR') {
      this.adminUser = true;
    }
    this.formSettingsUser = this.fb.group({
      celular: [this.user?.celular, [Validators.required,Validators.minLength(10)]],
      telefono: [this.user?.telefono,],
      correo_institucional: [this.user?.correo_institucional, [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      correo_personal: [this.user?.correo_personal, [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    });
  }

  isValidFieldUser(field: string) {
    return this.validatorsService.isValidField(this.formSettingsUser, field);
  }

  getFieldErrorUser(field: string) {
    return this.validatorsService.getFieldError(this.formSettingsUser, field);
  }

  ngOnInit(): void {

  }


  UpdateUser(){
    const modelo = {
      telefono: this.formSettingsUser.value.telefono,
      celular: this.formSettingsUser.value.celular,
      correo_institucional: this.formSettingsUser.value.correo_institucional,
      correo_personal: this.formSettingsUser.value.correo_personal,
    };

    this.userService.update(this.user.id, modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Usuario Editado',
          html: 'Perfil del usuario <strong>'+this.user.nombre+'</strong> editado correctamente',
          showConfirmButton: false,
          timer: 2500,
        });
      },
      error: (e) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Usuario NO Editado',
          html: 'No se pudo editar los datos del usuario <strong>'+this.user.nombre +'</strong>. '+ e,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    });

  }
  UpdatePassword(){
    const modelo = {
      contrasenia: this.formUpdatePassword.value.contrasenia,
      newContrasenia: this.formUpdatePassword.value.newcontrasenia,
    };
    this.userService.updatePassword(modelo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Contraseña Cambiada',
          text: 'Contraseña cambiada correctamente',
          showConfirmButton: false,
          timer: 2500,
        });
        this.formUpdatePassword.reset();
      },
      error: (message) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Contraseña NO Cambiada',
          text: 'No se pudo cambiar la contraseña. ' + message,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    })


  }

  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFileName = files[0].name;
      this.archivo = files[0];
    }
  }

  guardarLogo() {
    this.imageService.saveLogo(this.archivo).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Logo Cambiado!',
          text: 'Logo cambiado correctamente, por favor actualice la página',
          showConfirmButton: false,
          timer: 2500,
        });
        this.selectedFileName = null;
      },
      error: (e) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Logo NO Cambiado!',
          html: `No se pudo guardar el cambio de logo. Por favor revise que sean una imagen "<strong>PNG</strong>"`,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    })
  }



}
