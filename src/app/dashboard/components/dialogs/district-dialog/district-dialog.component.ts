import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { District } from '../../../../dashboard/interfaces/districts';
import { DistrictService } from '../../../../dashboard/services/districts.service';
import { ValidatorsService } from '../../../../shared/service/validators.service';

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

  constructor(
    private dialogReferencia: MatDialogRef<DistrictDialogComponent>,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private districtService: DistrictService,
    @Inject(MAT_DIALOG_DATA) public dataDistricts: District
  ) {
    this.formDistrict = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      provincia: ['', Validators.required],
    });
  }


  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formDistrict, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formDistrict, field)
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
          title: 'EOD Creado',
            html: `EOD <strong>`+modelo.nombre+`</strong> creado correctamente.`,
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
          title: 'EOD NO Creado',
            html: `No se pudo crear el EOD <strong>`+modelo.nombre+`</strong>. ` + e,
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
          title: 'EOD Editado',
            html: `EOD <strong>`+modelo.nombre+`</strong> editado correctamente.`,
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('editado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
          title: 'EOD NO Editado',
            html: `No se pudo editar el EOD <strong>`+modelo.nombre+`</strong>. ` +e,
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
