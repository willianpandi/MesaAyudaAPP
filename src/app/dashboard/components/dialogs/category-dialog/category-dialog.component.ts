import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../dashboard/services/categories.service';
import { Category} from '../../../../dashboard/interfaces/category';
import { ValidatorsService } from '../../../../shared/service/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css'],
})
export class CategoryDialogComponent implements OnInit {
  formCategory: FormGroup;
  tituloAccion: string = 'Nueva';
  botonAccion: string = 'Guardar';
  iconAccion: string = 'add_circle';

  opcionesEstado = [
    { valor: true, etiqueta: 'ACTIVO' },
    { valor: false, etiqueta: 'INACTIVO' }
  ];

  constructor(
    private dialogReferencia: MatDialogRef<CategoryDialogComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private validatorsService: ValidatorsService,
    @Inject(MAT_DIALOG_DATA) public dataCategory: Category,
  ) {
    this.formCategory= this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formCategory, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formCategory, field)
  }

  addCategory() {
    const modelo = {
      nombre: this.formCategory.value.nombre,
      descripcion: this.formCategory.value.descripcion,
      estado: this.formCategory.value.estado,
    };

    if (this.dataCategory === null) {
      this.categoryService.save(modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Categoría Creada',
            html: `Categoría <strong>`+modelo.nombre+`</strong> creado correctamente.`,
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Categoría NO Creada',
            html: `No se pudo crear la categoría <strong>`+modelo.nombre+`</strong>. ` + e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    } else {
      this.categoryService.update(this.dataCategory.id, modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Categoría Editado',
            html: `Categoría <strong>`+modelo.nombre+`</strong> editado correctamente.`,
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('editado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Categoría NO Editado',
            html: `No se pudo editar la categoría <strong>`+modelo.nombre+`</strong>. `+ e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.dataCategory) {
      this.formCategory.patchValue({
        nombre: this.dataCategory.nombre,
        descripcion: this.dataCategory.descripcion,
        estado: this.dataCategory.estado,
      });
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.iconAccion = 'edit';
    }
  }
}
