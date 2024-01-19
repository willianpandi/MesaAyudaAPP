import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../components/table/interfaces/table-colum.interface';

import { UsuarioService } from '../../../services/users.service';
import { Profile } from 'src/app/dashboard/interfaces/users';
import { TableConfig } from 'src/app/dashboard/components/table/interfaces/table-config.interface';
import { Table, TableAction } from 'src/app/dashboard/components/table/interfaces/table-action.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/dashboard/components/dialogs/user-dialog/user-dialog.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'table-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit{

  usuariosList: Profile[] = [];
  tableColumnsUsuarios: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
  };

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }

  setTableColumns() {
    this.tableColumnsUsuarios = [
      { label: 'Estado', def: 'estado', dataKey: 'estado', isSticky: true, dataType: 'boolean'},
      { label: 'N° Cédula', def: 'usuario', dataKey: 'usuario', isSticky: true },
      { label: 'Nombre Completo', def: 'nombre', dataKey: 'nombre', isSticky: true },
      { label: 'Étnia', def: 'etnia', dataKey: 'etnia' },
      { label: 'Rol', def: 'rol', dataKey: 'rol' },
      { label: 'Sexo', def: 'sexo', dataKey: 'sexo' },
      { label: 'Nivel de Instrucción', def: 'nivel_institucional', dataKey: 'nivel_institucional' },
      { label: 'Itinerancia', def: 'itinerancia', dataKey: 'itinerancia' },
      { label: 'Profesión', def: 'profesion', dataKey: 'profesion' },
      { label: 'F. Nacimiento', def: 'fecha_nacimiento', dataKey: 'fecha_nacimiento', dataType: 'date', formatt: 'dd/MM/yyyy'},
      { label: 'N° Teléfono', def: 'telefono', dataKey: 'telefono' },
      { label: 'Dirección', def: 'direccion', dataKey: 'direccion' },
      { label: 'Correo Institucional', def: 'correo_institucional', dataKey: 'correo_institucional' },
      { label: 'Correo Personal', def: 'correo_personal', dataKey: 'correo_personal' },
      { label: 'Regimen Laboral', def: 'regimen_laboral', dataKey: 'regimen_laboral' },
      { label: 'Modalidad Laboral', def: 'modalidad_laboral', dataKey: 'modalidad_laboral' },
      { label: 'Area Laboral', def: 'area_laboral', dataKey: 'area_laboral' },
      { label: 'Nombramiento', def: 'nombramiento', dataKey: 'nombramiento' },
      { label: 'F. Ingreso', def: 'fecha_ingreso', dataKey: 'fecha_ingreso', dataType: 'date', formatt: 'dd/MM/yyyy' },
      { label: 'Establecimiento', def: 'estableishment', dataKey: 'estableishment.nombre', dataType: 'object' },
      { label: 'Distrito', def: 'estableishmentname', dataKey: 'estableishment.district.codigo', dataType:'object'},
      { label: 'Creado en', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'HH:mm - dd/MM/yyyy '},
      { label: 'Actualizado en', def: 'apdateAt', dataKey: 'apdateAt', dataType: 'date', formatt: 'HH:mm - dd/MM/yyyy'},
    ];
  }

  setData(): void {
    this.usuarioService.lista().subscribe(
      (data) => {
        this.usuariosList = data;
      },
      (err) => {
        console.log(err)
      }
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

  onEdit(usuario: Profile) {
    console.log('Edit', usuario);
    this.dialog.open(UserDialogComponent, {
      disableClose: true,
      width:"800px",
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.setData();
      }
    })
  }

  onDelete(usuario: Profile) {
    console.log('Delete', usuario);
    Swal.fire({
      title: 'ADVERTENCIA',
      text: '¿Estás seguro de eliminar al usuario: ' + usuario.nombre + '?',
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
        this.usuarioService.delete(usuario.id).subscribe({
          next: (affectedRows: { affected: number }) => {
            if (affectedRows.affected === 1) {
              Swal.fire(
                'Eliminado!',
                'El usuario ha sido eliminado correctamente.',
                'success'
              );
              this.setData();
            } else {
              Swal.fire(
                'Advertencia',
                'No se ha eliminado el usuario, por que mantiene una relacion con otro dato',
                'warning'
              );
            }
          },
          error: (message) => {
            Swal.fire('Error', message, 'error');
          },
        });
      }
    });
  }

}
