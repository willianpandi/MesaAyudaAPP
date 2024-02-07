import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../components/table/interfaces/table-colum.interface';

import { DistritoService } from '../../../services/districts.service';
import { District } from 'src/app/dashboard/interfaces/districts';
import { TableConfig } from 'src/app/dashboard/components/table/interfaces/table-config.interface';
import { Table, TableAction } from 'src/app/dashboard/components/table/interfaces/table-action.interface';
import { MatDialog } from '@angular/material/dialog';
import { DistrictDialogComponent } from 'src/app/dashboard/components/dialogs/district-dialog/district-dialog.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'table-distrits',
  templateUrl: './districts-page.component.html',
  styleUrls: ['./districts-page.component.css']
})
export class DistrictsPageComponent implements OnInit {
  distritosList: District[]= [];
  tableColumnsDistritos: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
  };

  constructor(
    private distritoService: DistritoService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }
  setTableColumns() {
    this.tableColumnsDistritos = [
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Provincia', def: 'provincia', dataKey: 'provincia' },
      { label: 'Creado en', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Actualizado en', def: 'apdateAt', dataKey: 'apdateAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
    ];
  }

  setData(): void {
    this.distritoService.lista().subscribe(
      (data)=> {
        this.distritosList = data;
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


  districtDialog(){
    this.dialog.open(DistrictDialogComponent, {
      disableClose: true,
      width: "700px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.setData();
      }
    })
  }

  onEdit(dataDistricts: District) {
    console.log('Edit', dataDistricts);
    this.dialog.open(DistrictDialogComponent, {
      disableClose: true,
      width:"700px",
      data: dataDistricts
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.setData();
      }
    })
  }
  onDelete(distrito: District) {
    console.log('Delete', distrito);
    Swal.fire({
      title: 'ADVERTENCIA',
      text: '¿Estás seguro de eliminar el distrito: ' + distrito.nombre + '?',
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
        this.distritoService.delete(distrito.id).subscribe({
          next: (affectedRows: { affected: number }) => {
            if (affectedRows.affected === 1) {
              Swal.fire(
                'Eliminado!',
                'El distrito ha sido eliminado correctamente.',
                'success'
              );
              this.setData();
            } else {
              Swal.fire(
                'Advertencia',
                'No se ha eliminado el distrito, por que mantiene una relacion con otro dato',
                'warning'
              );
            }
          },
          error: (message) => {
            Swal.fire('Error', 'No se ha eliminado el distrito, por que mantiene una relacion con otro dato', 'error');
          },
        });
      }
    });
  }
}
