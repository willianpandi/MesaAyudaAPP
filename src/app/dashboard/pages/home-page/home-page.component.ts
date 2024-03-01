import { Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { TableColumn } from '../../components/table/interfaces/table-colum.interface';

import { EstableishmentService } from '../../services/estableishments.service';
import { CategoryService } from '../../services/categories.service';
import { UserService } from '../../services/users.service';
import { TicketService } from '../../services/tickets.service';
import { Estableishment } from '../../interfaces/estableishments';
import { Category} from '../../interfaces/category';
import { Ticket } from '../../interfaces/tickets';
import { AuthService } from '../../../auth/services/auth.service';
import { TableConfig } from '../../components/table/interfaces/table-config.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table, TableAction } from '../../components/table/interfaces/table-action.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


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
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class HomePageComponent implements OnInit {

  estabelishementsList: Estableishment[] = [];
  categoriesList: Category[] = [];
  newTicketsList: Ticket[] = [];
  reasigTicketsList: Ticket[] = [];
  ticketsList: Ticket[]  = [];
  tableConfig: TableConfig = {
    showActions: true,
  };

  usersCount!: number;
  estableishmentsCount!: number;
  ticketsCount!: number;
  categoriesCount!: number;

  tableColumnsEstablecimientos: TableColumn[] = [];
  tableColumnsCategorias: TableColumn[] = [];
  tableColumnsTickets: TableColumn[] = [];

  users: any;

  private authService = inject( AuthService);
  public user = computed(()=> this.authService.currentUser());

  range = new FormGroup({
    inicio: new FormControl<Date | null>(null),
    fin: new FormControl<Date | null>(null),
  });

  constructor(
    private estableishmentService: EstableishmentService,
    private categoryService: CategoryService,
    private userService: UserService,
    private ticketService: TicketService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,

  ) {
    this.users = this.authService.currentUser();
    this.dateAdapter.setLocale('es');
  }

  ngOnInit(): void {
    if (this.users.rol === 'ADMINISTRADOR') {
      this.setTicktesTableColumns();
      this.setDataAdmin();
    } else {
      this.setTableColumns();
      this.setDataSupport();
    }
    console.log({usuario: this.user});
  }

  setTableColumns() {

    this.tableColumnsEstablecimientos = [
      { label: 'Código', def: 'codigo', dataKey: 'codigo', isSticky: true, },
      { label: 'Unidad/Gestión', def: 'nombre', dataKey: 'nombre', },
      { label: 'Código EOD', def: 'district.codigo', dataKey: 'district.codigo', dataType: 'object', },
    ];

    this.tableColumnsCategorias = [
      { label: 'Tema de Ayuda', def: 'nombre', dataKey: 'nombre', isSticky: true, },
      {label: 'Descripción',def: 'descripcion',dataKey: 'descripcion', },
    ];

  }


  setDataSupport(): void {
    this.userService.listaEstableishments(this.users.id).subscribe(
      (data) => {
        this.estabelishementsList = data;
      },
      (err) => {}
    );
    this.userService.listCategoriesAsig().subscribe(
      (data) => {
        this.categoriesList = data;
      },
      (err) => {}
    );

    this.userService.listNewTickets().subscribe(
      (data) => {
        this.newTicketsList = data;
      },
      (err) => {}
    );

    this.ticketService.listTicketsReasig().subscribe(
      (data) => {
        this.reasigTicketsList = data;
      },
      (err) => {}
    );

  }

  setDataAdmin(): void {
    this.userService.count().subscribe(
      (data) => {
        this.usersCount = data.totalCountUsers;
      }
    );
    this.estableishmentService.count().subscribe(
      (data) => {
        this.estableishmentsCount = data.totalCountEstableishments;
      }
    );
    this.ticketService.count().subscribe(
      (data) => {
        this.ticketsCount = data.totalCountTickets;
      }
    );
    this.categoryService.count().subscribe(
      (data) => {
        this.categoriesCount = data.totalCountCategories;
      }
    );
    this.ticketService.lista().subscribe(
      (data) => {
        this.ticketsList = data;
      },
      (err) => {}
    );
  }

  setTicktesTableColumns(){
    this.tableColumnsTickets = [
      { label: 'N° Ticket', def: 'codigo', dataKey: 'codigo', isSticky: true, },
      { label: 'Estado', def: 'estado', dataKey: 'estado' },
      { label: 'Fecha Creación', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Fecha Ultima Actualización', def: 'updateAt', dataKey: 'updateAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Fecha Reasignación', def: 'reasignadoAt', dataKey: 'reasignadoAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Fecha Cierre', def: 'cierreAt', dataKey: 'cierreAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Tiempo Ocupado', def: 'tiempoOcupado', dataKey: 'tiempoOcupado', dataType: 'minutes', formatt: 'HH:mm' },
      { label: 'Tiempo Reasignado', def: 'tiempoReasignado', dataKey: 'tiempoReasignado', dataType: 'minutes', formatt: 'HH:mm'},
      { label: 'N° Cédula', def: 'cedula', dataKey: 'cedula' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Soporte Asignado', def: 'soporteAsignado', dataKey: 'soporteAsignado', dataType: 'object'},
      { label: 'Soporte Reasignado', def: 'soporteReasignado', dataKey: 'soporteReasignado'},
      { label: 'Departamento', def: 'subcategory.nombre', dataKey: 'subcategory.nombre', dataType: 'object' },
      { label: 'Unidad/Gestión', def: 'estableishment.nombre', dataKey: 'estableishment.nombre', dataType: 'object'},
      { label: 'Satisfacción', def: 'satisfaccion', dataKey: 'satisfaccion' },
      { label: 'Oportuno', def: 'a_oportuna', dataKey: 'a_oportuna' },
      { label: 'Se Soluciono', def: 's_problema', dataKey: 's_problema' },
      { label: 'Soporte Asistido', def: 'soportePresente', dataKey: 'soportePresente' },
    ];
  };

  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case Table.EDITAR:
        this.onEdit(tableAction.row);
        break;

      case Table.ELIMINAR:
        this.onDelete(tableAction.row);
        break;

      default:
        break;
    }
  };

  onEdit({ id }: Ticket) {
    this.router.navigateByUrl(`dashboard/ticket-detail/${id}`)
  };

  onDelete(ticket: Ticket) {
    Swal.fire({
      title: 'ADVERTENCIA',
      text: '¿Estás seguro de eliminar el ticket?',
      icon: 'warning',
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.delete(ticket.id).subscribe({
          next: ( resp ) => {
              Swal.fire(
                'Eliminado!',
                'Su ticket ha sido eliminado correctamente.',
                'success'
              );
              this.setDataAdmin();
          },
          error: (message) => {
            Swal.fire('Error', message, 'error');
          },
        });
      }
    });
  };

  filterDate(){
    const fechaInicio: Date = this.range.value.inicio!;
    const fechaFin: Date = this.range.value.fin!;

    this.ticketService.lista(fechaInicio, fechaFin).subscribe(
      (data) => {
        this.ticketsList = data;
      },
      (err) => {}
    );

  }
  removefilterDate(){
    this.ticketService.lista().subscribe(
      (data) => {
        this.ticketsList = data;
      },
      (err) => {}
    );
      this.range.reset();
  }

}
