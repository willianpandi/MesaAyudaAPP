import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../components/table/interfaces/table-colum.interface';

import { DistrictService } from '../../../services/districts.service';
import { District } from '../../../../dashboard/interfaces/districts';
import { TableConfig } from '../../../../dashboard/components/table/interfaces/table-config.interface';
import { Table, TableAction } from '../../../../dashboard/components/table/interfaces/table-action.interface';
import { MatDialog } from '@angular/material/dialog';
import { DistrictDialogComponent } from '../../../../dashboard/components/dialogs/district-dialog/district-dialog.component';

import { EstableishmentService } from '../../../services/estableishments.service';
import { Estableishment } from '../../../../dashboard/interfaces/estableishments';
import { EstableishmentDialogComponent } from '../../../../dashboard/components/dialogs/estableishment-dialog/estableishment-dialog.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'table-distrits',
  templateUrl: './districts-page.component.html',
  styleUrls: ['./districts-page.component.css']
})
export class DistrictsPageComponent implements OnInit {
  districtsList: District[]= [];
  estableishmentsList: Estableishment[]= [];
  tableColumnsDistricts: TableColumn[] = [];
  tableColumnsEstableishments: TableColumn[] = [];
  tableConfig: TableConfig = {
    showActions: true,
    showFilter: true,
    showDowload: true,
    isPaginable: true,
  };
  tableConfig2: TableConfig = {
    showActions: true,
    showFilter: true,
    showDowload: true,
    isPaginable: true,
  };

  constructor(
    private districtService: DistrictService,
    private estableishmentService: EstableishmentService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }
  setTableColumns() {
    this.tableColumnsDistricts = [
      { label: 'Estado', def: 'estado', dataKey: 'estado', isSticky: true, dataType: 'boolean'},
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Nombre EOD', def: 'nombre', dataKey: 'nombre' },
      { label: 'Provincia', def: 'provincia', dataKey: 'provincia' },
      { label: 'Creado', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Actualizado', def: 'updateAt', dataKey: 'updateAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
    ];
    this.tableColumnsEstableishments = [
      { label: 'Estado', def: 'estado', dataKey: 'estado', isSticky: true, dataType: 'boolean'},
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Nombre Unidad/Gestión', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código EOD', def: 'district.codigo', dataKey: 'district.codigo', dataType: 'object' },
      { label: 'Nombre EOD', def: 'district.nombre', dataKey: 'district.nombre', dataType: 'object' },
      { label: 'Creado', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
      { label: 'Actualizado', def: 'updateAt', dataKey: 'updateAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm' },
    ];
  }

  setData(): void {
    this.districtService.listaAll().subscribe(
      (data)=> {
        this.districtsList = data;
      },
      (err) => {}
    );
    this.estableishmentService.lista().subscribe(
      (data) => {
        this.estableishmentsList = data;
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

  onTableAction2(tableAction2: TableAction) {
    switch (tableAction2.action) {
      case Table.EDITAR:
        this.onEditEst(tableAction2.row);
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

  onEditEst(dataEstablecimiento: Estableishment ) {
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
}
