import { Component, OnInit, computed, inject } from '@angular/core';
import { TableColumn } from '../../components/table/interfaces/table-colum.interface';

import { DistritoService } from '../../services/districts.service';
import { EstablecimientoService } from '../../services/estableishments.service';
import { DirectivaService } from '../../services/directives.service';
import { UsuarioService } from '../../services/users.service';
import { District } from '../../interfaces/districts';
import { Estableishment } from '../../interfaces/estableishments';
import { Directive } from '../../interfaces/directives';
import { Profile } from '../../interfaces/users';
import { TicketService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/tickets';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  distritosList: Array<District> = [];
  establecimientosList: Array<Estableishment> = [];
  directivasList: Array<Directive> = [];
  usuariosList: Array<Profile> = [];
  ticketsList: Array<Ticket> = [];

  userCount!: number;
  estableishmentCount!: number;

  tableColumnsDistritos: TableColumn[] = [];
  tableColumnsEstablecimientos: TableColumn[] = [];
  tableColumnsDirectivas: TableColumn[] = [];
  tableColumnsUsuarios: TableColumn[] = [];
  users: any;

  private authService = inject( AuthService);
  public user = computed(()=> this.authService.currentUser());

  constructor(
    private distritoService: DistritoService,
    private establecimientoService: EstablecimientoService,
    private directivaService: DirectivaService,
    private usuarioService: UsuarioService,
    private ticketService: TicketService
  ) {
    this.users = this.authService.currentUser();
  }

  ngOnInit(): void {
      this.setTableColumns();
      this.setData();
      this.setDataCount();
      console.log({usuario: this.user});
  }

  setTableColumns() {
    this.tableColumnsDistritos = [
      { label: 'Codigo', def: 'codigo', dataKey: 'codigo' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Provincia', def: 'provincia', dataKey: 'provincia' },
    ];
    this.tableColumnsEstablecimientos = [
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Institución', def: 'institucion', dataKey: 'institucion' },
      {
        label: 'Nivel de Atención',
        def: 'nivel_atencion',
        dataKey: 'nivel_atencion',
      },
      { label: 'Tipologia', def: 'tipologia', dataKey: 'tipologia' },
      { label: 'Provincia', def: 'provincia', dataKey: 'provincia' },
      { label: 'Cantón', def: 'canton', dataKey: 'canton' },
      { label: 'Parroquia', def: 'parroquia', dataKey: 'parroquia' },
      // {
      //   label: 'Codigo Distrito',
      //   def: 'district.codigo',
      //   dataKey: 'district.codigo',
      //   dataType: 'object',
      // },
      // {
      //   label: 'Distrito',
      //   def: 'district',
      //   dataKey: 'district.nombre',
      //   dataType: 'object',
      // },
    ];

    this.tableColumnsDirectivas = [
      { label: 'Nombre de Problema', def: 'nombre', dataKey: 'nombre' },
      // {
      //   label: 'Descripción del Problema',
      //   def: 'descripcion',
      //   dataKey: 'descripcion',
      // },
      {
        label: 'Tiempo Estimado',
        def: 'rango_tiempo',
        dataKey: 'rango_tiempo',
      },
    ];
    // this.tableColumnsUsuarios = [
    //   {
    //     label: 'N° Cédula',
    //     def: 'usuario',
    //     dataKey: 'usuario',
    //     isSticky: true,
    //   },
    //   {
    //     label: 'Nombres Apellidos',
    //     def: 'nombre',
    //     dataKey: 'nombre',
    //     isSticky: true,
    //   },
      // { label: 'Sexo', def: 'sexo', dataKey: 'sexo' },
      // {
      //   label: 'Nivel de Instrucción',
      //   def: 'nivel_institucional',
      //   dataKey: 'nivel_institucional',
      // },
      // { label: 'Itinerancia', def: 'itinerancia', dataKey: 'itinerancia' },
      // { label: 'Profesión', def: 'profesion', dataKey: 'profesion' },
      // { label: 'Étnia', def: 'etnia', dataKey: 'etnia' },
      // {
      //   label: 'F. Nacimiento',
      //   def: 'fecha_nacimiento',
      //   dataKey: 'fecha_nacimiento',
      //   dataType: 'date',
      //   formatt: 'dd/MM/yyyy',
      // },
      // { label: 'N° Teléfono', def: 'telefono', dataKey: 'telefono' },
      // { label: 'Dirección', def: 'direccion', dataKey: 'direccion' },
      // {
      //   label: 'Correo Institucional',
      //   def: 'correo_institucional',
      //   dataKey: 'correo_institucional',
      // },
      // {
      //   label: 'Correo Personal',
      //   def: 'correo_personal',
      //   dataKey: 'correo_personal',
      // },
      // {
      //   label: 'Regimen Laboral',
      //   def: 'regimen_laboral',
      //   dataKey: 'regimen_laboral',
      // },
      // {
      //   label: 'Modalidad Laboral',
      //   def: 'modalidad_laboral',
      //   dataKey: 'modalidad_laboral',
      // },
      // { label: 'Area Laboral', def: 'area_laboral', dataKey: 'area_laboral' },
      // { label: 'Nombramiento', def: 'nombramiento', dataKey: 'nombramiento' },
      // {
      //   label: 'F. Ingreso',
      //   def: 'fecha_ingreso',
      //   dataKey: 'fecha_ingreso',
      //   dataType: 'date',
      //   formatt: 'dd/MM/yyyy',
      // },
    //   {
    //     label: 'Establecimiento',
    //     def: 'estableishment',
    //     dataKey: 'estableishment.nombre',
    //     dataType: 'object',
    //   },
    // ];
  }


  setData(): void {
    this.distritoService.lista().subscribe(
      (data) => {
        this.distritosList = data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.distritoService.detailes(this.users.estableishment.district.id).subscribe(
      (data) => {
        this.establecimientosList = data;
        console.log({EStablecimientos: this.establecimientosList});

      },
      (err) => {
        console.log(err);
      }
    );
    this.directivaService.lista().subscribe(
      (data) => {
        this.directivasList = data;
      },
      (err) => {
        console.log(err);
      }
    );
    // this.usuarioService.lista().subscribe(
    //   (data) => {
    //     this.usuariosList = data;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    this.ticketService.lista().subscribe(
      (data) => {
        this.ticketsList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setDataCount(): void {
    this.usuarioService.count().subscribe(
      (data) => {
        this.userCount = data.totalCountUsers;
      }
    )
    this.establecimientoService.count().subscribe(
      (data) => {
        this.estableishmentCount = data.totalCountEstableishments;
      }
    )
  }
}
