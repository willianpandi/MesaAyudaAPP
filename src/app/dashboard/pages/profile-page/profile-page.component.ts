import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  private authService = inject( AuthService);
  users: any;
  informacionBasica: any[] = [];
  informacionContacto: any[] = [];
  informacionAdicional: any[] = [];
  informacionLaboral: any[] = [];
  informacionEstablecimiento: any[] = [];

  constructor(){
    this.users = this.authService.currentUser();

    this.informacionBasica = [
      { label: 'N° Cédula', data: this.users.usuario },
      { label: 'Nombre Completo', data: this.users.nombre },
      { label: 'Puesto', data: this.users.puesto },
      { label: 'F. Ingreso', data: this.users.f_ingreso },
    ];
    this.informacionContacto = [
      { label: 'Correo Personal', data: this.users.correo_personal },
      { label: 'Correo Institucional', data: this.users.correo_institucional },
      { label: 'N° Celular', data: this.users.celular },
      { label: 'N° Teléfono', data: this.users.telefono },
    ];
    this.informacionAdicional = [
      { label: 'Grupo Ocupacional', data: this.users.g_Ocupacional },
      { label: 'Tipo Contrato', data: this.users.m_contrato },
      { label: 'Cambio Administrativo', data: this.users.c_Administrativo },
      { label: 'Funciones Adicionales', data: this.users.funciones_A },
    ];

  }
}
