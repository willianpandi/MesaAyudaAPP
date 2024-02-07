import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  private authService = inject( AuthService);


  users: any;
  informacionBasica: any[] = [];
  informacionContacto: any[] = [];
  informacionDireccion: any[] = [];
  informacionLaboral: any[] = [];
  informacionEstablecimiento: any[] = [];
  constructor(){
    this.users = this.authService.currentUser();

    this.informacionBasica = [
      { label: 'Número de Cédula', data: this.users.usuario },
      { label: 'Nombre Completo', data: this.users.nombre },
      { label: 'Sexo', data: this.users.sexo },
      { label: 'Etnia', data: this.users.etnia },
      { label: 'Fecha de Nacimiento', data: this.users.fecha_nacimiento },
      { label: 'Nivel de Institucion', data: this.users.nivel_institucional },
      { label: 'Profesion', data: this.users.profesion },
      // { label: '', data: this.users. },
    ];
    this.informacionContacto = [
      { label: 'Correo Personal', data: this.users.correo_personal },
      { label: 'Correo Institucional', data: this.users.correo_institucional },
      { label: 'Número Celular', data: this.users.telefono },
    ];
    this.informacionDireccion = [
      { label: 'Dirección', data: this.users.direccion },
    ];
    this.informacionLaboral = [
      { label: 'Área Laboral', data: this.users.area_laboral },
      { label: 'Modalidad', data: this.users.modalidad_laboral },
      { label: 'Tipo de Nombramiento', data: this.users.nombramiento },
      { label: 'Régimen Laboral', data: this.users.regimen_laboral },
      { label: 'Fecha de Ingreso', data: this.users.fecha_ingreso },
      { label: 'Itinerancia', data: this.users.itinerancia },
    ]

    this.informacionEstablecimiento = [
      { label: 'Nombre de Establecimiento', data: this.users.estableishment.nombre },
      { label: 'Código Distrital', data: this.users.estableishment.district.codigo },
      { label: 'Provincia', data: this.users.estableishment.provincia },
      { label: 'Cánton', data: this.users.estableishment.canton },
      { label: 'Parroquia', data: this.users.estableishment.parroquia },

    ]

  }



}
