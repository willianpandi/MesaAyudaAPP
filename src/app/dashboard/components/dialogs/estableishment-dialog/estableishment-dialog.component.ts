import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { District } from '../../../../dashboard/interfaces/districts';
import { Estableishment } from '../../../../dashboard/interfaces/estableishments';
import { DistrictService } from '../../../../dashboard/services/districts.service';
import { EstableishmentService } from '../../../../dashboard/services/estableishments.service';
import { ValidatorsService } from '../../../../shared/service/validators.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-estableishment-dialog',
  templateUrl: './estableishment-dialog.component.html',
  styleUrls: ['./estableishment-dialog.component.css'],
})
export class EstableishmentDialogComponent implements OnInit {
  formEstableishment: FormGroup;
  tituloAccion: string = 'Nueva';
  botonAccion: string = 'Guardar';
  iconAccion: string = 'add_circle';
  listaDistrict: District[] = [];

  constructor(
    private dialogReferencia: MatDialogRef<EstableishmentDialogComponent>,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private estableishmentService: EstableishmentService,
    private districtService: DistrictService,
    @Inject(MAT_DIALOG_DATA) public dataEstablecimiento: Estableishment
  ) {
    this.formEstableishment = this.fb.group({
      district: ['', Validators.required],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
    });
    this.districtService.lista().subscribe(
      (data) => {
        this.listaDistrict = data;
      },
      (err) => {}
    );
  }


  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formEstableishment, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formEstableishment, field)
  }

  addEstableishment() {
    const modelo = {
      district: this.formEstableishment.value.district,
      codigo: this.formEstableishment.value.codigo,
      nombre: this.formEstableishment.value.nombre,
    };

    if (this.dataEstablecimiento == null) {
      this.estableishmentService.save(modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Unidad/Gestión Creado',
            html: `Unidad/Gestión <strong>`+modelo.nombre+`</strong> creado correctamente.`,
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Unidad/Gestión NO Creado',
            html: `No se pudo crear la Unidad/Gestión <strong>`+modelo.nombre+`</strong>. ` + e,
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
            title: 'Unidad/Gestión Editado',
              html:
                `Unidad/Gestión <strong>`+modelo.nombre+`</strong>, editado correctamente.`,
              showConfirmButton: false,
              timer: 2500,
            });
            this.dialogReferencia.close('editado');
          },
          error: (e) => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'error',
            title: 'Unidad/Gestión NO Editado',
              html:
                `No se pudo editar el Unidad/Gestión <strong>`+modelo.nombre+`</strong>. ` + e,
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
        district: this.dataEstablecimiento.district.id,
        codigo: this.dataEstablecimiento.codigo,
        nombre: this.dataEstablecimiento.nombre,
      });
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.iconAccion = 'edit';
    }
  }
}
