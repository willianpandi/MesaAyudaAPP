import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../components/table/interfaces/table-colum.interface';

import { UserService } from '../../../services/users.service';
import { User } from '../../../../dashboard/interfaces/users';
import { TableConfig } from '../../../../dashboard/components/table/interfaces/table-config.interface';
import { Table, TableAction } from '../../../../dashboard/components/table/interfaces/table-action.interface';
import { UserDialogComponent } from '../../../../dashboard/components/dialogs/user-dialog/user-dialog.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'table-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit{

  usersList: User[] = [];
  tableColumnsUsers: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
    showFilter: true,
    showDowload: true,
    isPaginable: true,
  };

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }

  setTableColumns() {
    this.tableColumnsUsers = [
      { label: 'Estado', def: 'estado', dataKey: 'estado', isSticky: true, dataType: 'boolean'},
      { label: 'Rol', def: 'rol', dataKey: 'rol' },
      { label: 'Cédula', def: 'usuario', dataKey: 'usuario' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Fecha Ingreso', def: 'f_ingreso', dataKey: 'f_ingreso', dataType: 'date', formatt:'dd/MM/yyyy' },
      { label: 'Denominación_Puesto ', def: 'puesto', dataKey: 'puesto' },
      { label: 'Correo Institucional', def: 'correo_institucional', dataKey: 'correo_institucional' },
      { label: 'Correo Personal', def: 'correo_personal', dataKey: 'correo_personal' },
      { label: 'N° Celular', def: 'celular', dataKey: 'celular' },
      { label: 'N° Teléfono', def: 'telefono', dataKey: 'telefono' },
      { label: 'Creado', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm'},
      { label: 'Actualizado', def: 'updateAt', dataKey: 'updateAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm'},
    ];
  }

  setData(): void {
    this.userService.lista().subscribe(
      (data) => {
        this.usersList = data;
      },
      (err) => {}
    );
  }

  // Metodo que ayuda a escuchar las acciones
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
  }


  userDialog() {
    this.dialog.open(UserDialogComponent, {
      disableClose: true,
      width:"800px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.setData();
      }
    })
  }

  onEdit({ id }: User) {
    this.router.navigateByUrl(`dashboard/user-detail/${id}`)
  }

  onDelete(usuario: User) {
    Swal.fire({
      title: 'ADVERTENCIA',
      html: `¿Estás seguro de eliminar al usuario <strong>` + usuario.nombre + `</strong>?, recuerde que se eliminará la/las relaciones que mantiene con las Unidades/Gestiones asignadas.`,
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
        this.userService.delete(usuario.id).subscribe({
          next: () => {
              Swal.fire(
                'Eliminado!',
                `El usuario <strong>`+ usuario.nombre +`</strong> ha sido eliminado correctamente.`,
                'success'
              );
              this.setData();
          },
          error: (message) => {
            Swal.fire('Error', `No se ha eliminado el usuario <strong>`+ usuario.nombre +`</strong>, por que mantiene una relacion con categorías de ayuda.`, 'error');
          },
        });
      }
    });
  }

}
