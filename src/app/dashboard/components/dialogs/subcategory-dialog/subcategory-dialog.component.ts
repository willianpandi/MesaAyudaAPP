import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category, SubCategory } from '../../../../dashboard/interfaces/category';
import { CategoryService } from '../../../../dashboard/services/categories.service';
import { SubCategoryService } from '../../../../dashboard/services/subcategories.service';
import { ValidatorsService } from '../../../../shared/service/validators.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dialog.component.html',
  styleUrls: ['./subcategory-dialog.component.css']
})
export class SubcategoryDialogComponent {

  formSubCategory: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  iconAccion: string = 'add_circle';
  listCategories: Category[] = [];

  constructor(
    private dialogReferencia: MatDialogRef<SubcategoryDialogComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private subcategoryService: SubCategoryService,
    private validatorsService: ValidatorsService,
    @Inject(MAT_DIALOG_DATA) public dataSubCategory: SubCategory,
  ) {
    this.formSubCategory= this.fb.group({
      nombre: ['', Validators.required],
      tiempo: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
    });
    this.categoryService.lista().subscribe(
      (data) => {
        this.listCategories = data;
      },
      (error) => {}
    )
  }

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.formSubCategory, field)
  }

  getFieldError( field: string ) {
    return this.validatorsService.getFieldError(this.formSubCategory, field)
  }

  addSubCategory() {
    const modelo = {
      nombre: this.formSubCategory.value.nombre,
      tiempo: this.formSubCategory.value.tiempo,
      category: this.formSubCategory.value.category,
    };

    if (this.dataSubCategory === null) {
      this.subcategoryService.save(modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Departamento Creado',
            html: 'Departamento '+modelo.nombre+' creado correctamente.',
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Departamento NO Creado',
            html: `No se pudo crear la departamento <strong>`+modelo.nombre+`</strong>. `+e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    } else {
      this.subcategoryService.update(this.dataSubCategory.id, modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Departamento Editado',
            html: `Departamento <strong>`+modelo.nombre+`</strong> editado correctamente.`,
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogReferencia.close('editado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Departamento NO Editado',
            html: `No se pudo editar la departamento <strong>`+modelo.nombre+`</strong>. `+ e,
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.dataSubCategory) {
      this.formSubCategory.patchValue({
        nombre: this.dataSubCategory.nombre,
        tiempo: this.dataSubCategory.tiempo,
        category: this.dataSubCategory.category.id,
      });
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.iconAccion = 'edit';
    }
  }

}
