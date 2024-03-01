import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../components/table/interfaces/table-colum.interface';
import { CategoryService } from '../../../services/categories.service';
import { TableConfig } from '../../../../dashboard/components/table/interfaces/table-config.interface';
import { Table,TableAction } from '../../../../dashboard/components/table/interfaces/table-action.interface';
import { Category, SubCategory} from '../../../../dashboard/interfaces/category';
import { CategoryDialogComponent } from '../../../../dashboard/components/dialogs/category-dialog/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SubCategoryService } from '../../../../dashboard/services/subcategories.service';
import { SubcategoryDialogComponent } from '../../../../dashboard/components/dialogs/subcategory-dialog/subcategory-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'table-directives',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {
  categoryList: Category[] = [];
  subCategoryList: SubCategory[] = [];
  tableColumnsCategory: TableColumn[] = [];
  tableColumnsSubCategory: TableColumn[] = [];
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
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setTableColumns();
    this.setData();
  }
  setTableColumns() {
    this.tableColumnsCategory = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      {
        label: 'Descripción del Problema',
        def: 'descripcion',
        dataKey: 'descripcion',
      },
      {
        label: 'Creado',
        def: 'createdAt',
        dataKey: 'createdAt',
        dataType: 'date',
        formatt: 'dd/MM/yyyy - HH:mm',
      },
      {
        label: 'Actualizado',
        def: 'updateAt',
        dataKey: 'updateAt',
        dataType: 'date',
        formatt: 'dd/MM/yyyy - HH:mm',
      },
    ];

    this.tableColumnsSubCategory = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Categoría', def: 'category.nombre', dataKey: 'category.nombre', dataType: 'object' },
      {
        label: 'Tiempo Estimado',
        def: 'tiempo',
        dataKey: 'tiempo',
        dataType: 'minutes',
        formatt: 'HH:mm'
      },
      {
        label: 'Creado',
        def: 'createdAt',
        dataKey: 'createdAt',
        dataType: 'date',
        formatt: 'dd/MM/yyyy - HH:mm',
      },
      {
        label: 'Actualizado',
        def: 'updateAt',
        dataKey: 'updateAt',
        dataType: 'date',
        formatt: 'dd/MM/yyyy - HH:mm',
      },
    ];
  }

  setData(): void {
    this.categoryService.lista().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (err) => {}
    );
    this.subCategoryService.lista().subscribe(
      (data) => {
        this.subCategoryList = data;
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

      case Table.ELIMINAR:
        this.onDelete(tableAction.row);
        break;

      default:
        break;
    }
  }


  categoryDialog() {
    this.dialog
      .open(CategoryDialogComponent, {
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


  onEdit(dataCategory: Category) {
    this.dialog
      .open(CategoryDialogComponent, {
        disableClose: true,
        width: '700px',
        data: dataCategory,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.setData();
        }
      });
  }
  onDelete(category: Category) {
    Swal.fire({
      title: 'ADVERTENCIA',
      html: `¿Estás seguro de eliminar la categoría <strong>` + category.nombre + `</strong>?, recuerde que se eliminaran los datos de subcategorías relacionadas.`,
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
        this.categoryService.delete(category.id).subscribe({
          next: () => {
              Swal.fire(
                'Eliminado!',
                `La categoría <strong>` + category.nombre + `</strong> se ha sido eliminado correctamente.`,
                'success'
              );
              this.setData();
          },
          error: (message) => {
            Swal.fire('Error', `No se ha eliminado la categoría <strong>` + category.nombre + `</strong>, por que mantiene una relación con Tickets.`, 'error');
          },
        });
      }
    });
  }

  onTableAction2(tableAction2: TableAction) {
    switch (tableAction2.action) {
      case Table.EDITAR:
        this.onEditSub(tableAction2.row);
        break;

      case Table.ELIMINAR:
        this.onDeleteSub(tableAction2.row);
        break;

      default:
        break;
    }
  }

  subCategoryDialog() {
    this.dialog
      .open(SubcategoryDialogComponent, {
        disableClose: true,
        width: '800px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.setData();
        }
      });
  }

  onEditSub(dataSubCategory: SubCategory) {
    this.dialog
      .open(SubcategoryDialogComponent, {
        disableClose: true,
        width: '700px',
        data: dataSubCategory,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.setData();
        }
      });
  }
  onDeleteSub(subcategory: SubCategory) {
    Swal.fire({
      title: 'ADVERTENCIA',
      html: `¿Estás seguro de eliminar la sub-categoría <strong>` + subcategory.nombre + `</strong> que pertenece a la categoría <strong>`+ subcategory.category.nombre +` </strong>?`,
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
        this.subCategoryService.delete(subcategory.id).subscribe({
          next: () => {
              Swal.fire(
                'Eliminado!',
                `La sub-categoría <strong>` + subcategory.nombre + `</strong> ha sido eliminado correctamente.`,
                'success'
              );
              this.setData();
          },
          error: (message) => {
            Swal.fire('Error', `No se ha eliminado la sub-categoría <strong>` + subcategory.nombre + `</strong>.`, 'error');
          },
        });
      }
    });
  }
}
