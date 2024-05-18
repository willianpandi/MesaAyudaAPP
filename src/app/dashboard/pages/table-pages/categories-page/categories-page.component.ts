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
      { label: 'Estado', def: 'estado', dataKey: 'estado', isSticky: true, dataType: 'boolean'},
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Descripción del Problema', def: 'descripcion', dataKey: 'descripcion', },
      { label: 'Creado',def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm', },
      { label: 'Actualizado', def: 'updateAt', dataKey: 'updateAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm', },
    ];

    this.tableColumnsSubCategory = [
      { label: 'Estado', def: 'estado', dataKey: 'estado', isSticky: true, dataType: 'boolean' },
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Categoría', def: 'category.nombre', dataKey: 'category.nombre', dataType: 'object' },
      {  label: 'Tiempo Estimado', def: 'tiempo', dataKey: 'tiempo', dataType: 'minutes', formatt: 'HH:mm' },
      { label: 'Creado', def: 'createdAt', dataKey: 'createdAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm', },
      { label: 'Actualizado', def: 'updateAt', dataKey: 'updateAt', dataType: 'date', formatt: 'dd/MM/yyyy - HH:mm', },
    ];
  }

  setData(): void {
    this.categoryService.listaAll().subscribe(
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

  onTableAction2(tableAction2: TableAction) {
    switch (tableAction2.action) {
      case Table.EDITAR:
        this.onEditSub(tableAction2.row);
        break;
      default:
        break;
    }
  }

  subCategoryDialog() {
    this.dialog
      .open(SubcategoryDialogComponent, {
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
}
