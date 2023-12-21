import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../components/table/interfaces/table-colum.interface';

import { DirectivaService } from '../../../services/directives.service';
import { TableConfig } from 'src/app/dashboard/components/table/interfaces/table-config.interface';
import {
  Table,
  TableAction,
} from 'src/app/dashboard/components/table/interfaces/table-action.interface';
import { Directive } from 'src/app/dashboard/interfaces/directives';
import { DirectiveDialogComponent } from 'src/app/dashboard/components/dialogs/directive-dialog/directive-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'table-directives',
  templateUrl: './directives-page.component.html',
  styleUrls: ['./directives-page.component.css'],
})
export class DirectivesPageComponent implements OnInit {
  directivasList: Directive[] = [];
  tableColumnsDirectivas: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
  };

  constructor(
    private directiveService: DirectivaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }
  setTableColumns() {
    this.tableColumnsDirectivas = [
      { label: 'Nombre de Problema', def: 'nombre', dataKey: 'nombre' },
      {
        label: 'Descripción del Problema',
        def: 'descripcion',
        dataKey: 'descripcion',
      },
      {
        label: 'Tiempo Estimado',
        def: 'rango_tiempo',
        dataKey: 'rango_tiempo',
      },
      {
        label: 'Creado en',
        def: 'createdAt',
        dataKey: 'createdAt',
        dataType: 'date',
        formatt: 'HH:mm - dd/MM/yyyy',
      },
      {
        label: 'Actualizado en',
        def: 'apdateAt',
        dataKey: 'apdateAt',
        dataType: 'date',
        formatt: 'HH:mm - dd/MM/yyyy',
      },
    ];
  }

  setData(): void {
    this.directiveService.lista().subscribe(
      (data) => {
        this.directivasList = data;
      },
      (err) => {
        console.log(err);
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

  directiveDialog() {
    this.dialog
      .open(DirectiveDialogComponent, {
        disableClose: true,
        width: '700px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.setData();
        }
      });
  }

  onEdit(dataDirectives: Directive) {
    this.dialog
      .open(DirectiveDialogComponent, {
        disableClose: true,
        width: '700px',
        data: dataDirectives,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.setData();
        }
      });
  }
  onDelete(directiva: Directive) {
    Swal.fire({
      title: 'ADVERTENCIA',
      text: '¿Estás seguro de eliminar la directiva: ' + directiva.nombre + '?',
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
        this.directiveService.delete(directiva.id).subscribe({
          next: (affectedRows: { affected: number }) => {
            if (affectedRows.affected === 1) {
              Swal.fire(
                'Eliminado!',
                'La directiva ha sido eliminado correctamente.',
                'success'
              );
              this.setData();
            } else {
              Swal.fire(
                'Advertencia',
                'No se ha eliminado la directiva, por que mantiene una relacion con otro dato',
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
