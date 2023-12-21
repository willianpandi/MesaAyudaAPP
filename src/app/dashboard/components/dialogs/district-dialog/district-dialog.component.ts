import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { District } from 'src/app/dashboard/interfaces/districts';
import { DistritoService } from 'src/app/dashboard/services/districts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-district-dialog',
  templateUrl: './district-dialog.component.html',
  styleUrls: ['./district-dialog.component.css'],
})
export class DistrictDialogComponent implements OnInit {
  formDistrict: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  iconAccion: string = 'add_circle';
  listaDistricts: District[] = [];
  distrito: any = [];

  constructor(
    private dialogReferencia: MatDialogRef<DistrictDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private districtService: DistritoService,
    @Inject(MAT_DIALOG_DATA) public dataDistricts: District
  ) {
    this.formDistrict = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      provincia: ['', Validators.required],
    });
  }

  addDistrict() {
    const modelo = {
      codigo: this.formDistrict.value.codigo,
      nombre: this.formDistrict.value.nombre,
      provincia: this.formDistrict.value.provincia,
    };

    if (this.dataDistricts == null) {
      this.districtService.save(modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Distrito '+modelo.nombre+' creado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo crear el distrito. ' + e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    } else {
      this.districtService.update(this.dataDistricts.id, modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Distrito' + modelo.nombre + ' editado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('editado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo editar el distrito '+modelo.nombre + '. ' +e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.dataDistricts) {
      this.formDistrict.patchValue({
        codigo: this.dataDistricts.codigo,
        nombre: this.dataDistricts.nombre,
        provincia: this.dataDistricts.provincia,
      });
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.iconAccion = 'edit';
    }
  }
}
