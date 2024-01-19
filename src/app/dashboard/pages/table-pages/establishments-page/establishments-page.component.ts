import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../components/table/interfaces/table-colum.interface';

import { EstablecimientoService } from '../../../services/estableishments.service';
import { Estableishment } from 'src/app/dashboard/interfaces/estableishments';
import { TableConfig } from 'src/app/dashboard/components/table/interfaces/table-config.interface';
import { Table, TableAction } from 'src/app/dashboard/components/table/interfaces/table-action.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/dashboard/components/dialogs/user-dialog/user-dialog.component';
import { EstableishmentDialogComponent } from 'src/app/dashboard/components/dialogs/estableishment-dialog/estableishment-dialog.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'table-establishments',
  templateUrl: './establishments-page.component.html',
  styleUrls: ['./establishments-page.component.css']
})
export class EstablishmentsPageComponent implements OnInit {

  establecimientosList: Estableishment[]= [];
  tableColumnsEstablecimientos: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
  };

  constructor(
    private establecimientoService: EstablecimientoService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }
  setTableColumns() {
    this.tableColumnsEstablecimientos = [
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Institución', def: 'institucion', dataKey: 'institucion' },
      { label: 'Nivel de Atención', def: 'nivel_atencion', dataKey: 'nivel_atencion' },
      { label: 'Tipologia', def: 'tipologia', dataKey: 'tipologia' },
      { label: 'Provincia', def: 'provincia', dataKey: 'provincia' },
      { label: 'Cantón', def: 'canton', dataKey: 'canton' },
      { label: 'Parroquia', def: 'parroquia', dataKey: 'parroquia' },
      { label: 'Codigo Distrito', def: 'districtcode', dataKey: 'district.codigo', dataType: 'object' },
      { label: 'Distrito', def: 'districts', dataKey: 'district.nombre', dataType: 'object' },
      { label: 'Creado en', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'HH:mm - dd/MM/yyyy' },
      { label: 'Actualizado en', def: 'apdateAt', dataKey: 'apdateAt', dataType: 'date', formatt: 'HH:mm - dd/MM/yyyy' },

    ];
  }

  setData(): void {
    this.establecimientoService.lista().subscribe(
      (data) => {
        this.establecimientosList = data;
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

  estableishmentDialog(){
    this.dialog.open(EstableishmentDialogComponent, {
      disableClose: true,
      width: "700px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.setData();
      }
    })
  }

  onEdit(dataEstablecimiento: Estableishment ) {
    console.log('Edit', dataEstablecimiento);
    this.dialog.open(EstableishmentDialogComponent, {
      disableClose: true,
      width:"700px",
      data: dataEstablecimiento
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.setData();
      }
    })
  }
  onDelete(establecimiento: Estableishment) {
    console.log('Delete', establecimiento);
    Swal.fire({
      title: 'ADVERTENCIA',
      text: '¿Estás seguro de eliminar el establecimiento: ' + establecimiento.nombre + '?',
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
        this.establecimientoService.delete(establecimiento.id).subscribe({
          next: (affectedRows: { affected: number }) => {
            if (affectedRows.affected === 1) {
              Swal.fire(
                'Eliminado!',
                'El establecimiento se ha sido eliminado correctamente.',
                'success'
              );
              this.setData();
            } else {
              Swal.fire(
                'Advertencia',
                'No se ha eliminado el establecimiento, por que mantiene una relacion con otro dato',
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
