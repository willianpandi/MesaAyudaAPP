import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { District } from 'src/app/dashboard/interfaces/districts';

import { Estableishment } from 'src/app/dashboard/interfaces/estableishments';
import { DistritoService } from 'src/app/dashboard/services/districts.service';
import { EstablecimientoService } from 'src/app/dashboard/services/estableishments.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-estableishment-dialog',
  templateUrl: './estableishment-dialog.component.html',
  styleUrls: ['./estableishment-dialog.component.css'],
})
export class EstableishmentDialogComponent implements OnInit {
  formEstableishment: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  iconAccion: string = 'add_circle';
  listaDistrict: District[] = [];

  constructor(
    private dialogReferencia: MatDialogRef<EstableishmentDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private estableishmentService: EstablecimientoService,
    private districtService: DistritoService,
    @Inject(MAT_DIALOG_DATA) public dataEstablecimiento: Estableishment
  ) {
    this.formEstableishment = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      institucion: ['', Validators.required],
      nivel_atencion: ['', Validators.required],
      tipologia: ['', Validators.required],
      provincia: ['', Validators.required],
      canton: ['', Validators.required],
      parroquia: ['', Validators.required],
      district: ['', Validators.required],
    });
    this.districtService.lista().subscribe(
      (data) => {
        this.listaDistrict = data;
      },
      (err) => {}
    );
  }

  addEstableishment() {
    console.log(this.formEstableishment.value);

    const modelo = {
      codigo: this.formEstableishment.value.codigo,
      nombre: this.formEstableishment.value.nombre,
      institucion: this.formEstableishment.value.institucion,
      nivel_atencion: this.formEstableishment.value.nivel_atencion,
      tipologia: this.formEstableishment.value.tipologia,
      provincia: this.formEstableishment.value.provincia,
      canton: this.formEstableishment.value.canton,
      parroquia: this.formEstableishment.value.parroquia,
      district: this.formEstableishment.value.district,
    };

    if (this.dataEstablecimiento == null) {
      this.estableishmentService.save(modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Establecimiento ' + modelo.nombre + ' creado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo crear la directiva. ' + e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    } else {
      this.estableishmentService
        .update(this.dataEstablecimiento.id, modelo)
        .subscribe({
          next: (data) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              text:
                'Establecimiento ' + modelo.nombre + ' editado correctamente',
              showConfirmButton: false,
              timer: 2500,
            });
            this.dialogReferencia.close('editado');
          },
          error: (e) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'error',
              text:
                'No se pudo editar el establecimiento ' +
                modelo.nombre +
                '. ' +
                e,
              showConfirmButton: false,
              timer: 2500,
            });
          },
        });
    }
  }
  ngOnInit(): void {
    if (this.dataEstablecimiento) {
      this.formEstableishment.patchValue({
        codigo: this.dataEstablecimiento.codigo,
        nombre: this.dataEstablecimiento.nombre,
        institucion: this.dataEstablecimiento.institucion,
        nivel_atencion: this.dataEstablecimiento.nivel_atencion,
        tipologia: this.dataEstablecimiento.tipologia,
        provincia: this.dataEstablecimiento.provincia,
        canton: this.dataEstablecimiento.canton,
        parroquia: this.dataEstablecimiento.parroquia,
        district: this.dataEstablecimiento.district.id,
      });
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.iconAccion = 'edit';
    }
  }
}
