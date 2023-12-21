import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectivaService } from 'src/app/dashboard/services/directives.service';
import { Directive } from 'src/app/dashboard/interfaces/directives';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directive-dialog',
  templateUrl: './directive-dialog.component.html',
  styleUrls: ['./directive-dialog.component.css'],
})
export class DirectiveDialogComponent implements OnInit {
  formDirective: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  iconAccion: string = 'add_circle';

  constructor(
    private dialogReferencia: MatDialogRef<DirectiveDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private directiveService: DirectivaService,
    @Inject(MAT_DIALOG_DATA) public dataDirective: Directive
  ) {
    this.formDirective = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      rango_tiempo: ['', Validators.required],
    });
  }

  // mostrarAlerta(msg: string, action: string) {
  //   this.snackBar.open(msg, action, {
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top',
  //     duration: 3000
  //   });
  // }

  addDirective() {
    // console.log(this.formDirective.value);
    const modelo = {
      // id: '',
      // createdAt: "",
      // apdateAt: "",
      nombre: this.formDirective.value.nombre,
      descripcion: this.formDirective.value.descripcion,
      rango_tiempo: this.formDirective.value.rango_tiempo,
    };

    if (this.dataDirective === null) {
      this.directiveService.save(modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Directiva '+modelo.nombre+' creado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          // this.mostrarAlerta("Perfil de directiva creado", "Listo");
          this.dialogReferencia.close('creado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo crear la directiva. '+modelo.nombre + e,
            showConfirmButton: false,
            timer: 2500,
          });
          // this.mostrarAlerta("No se pudo crear", "Error");
        },
      });
    } else {
      // const directiveId: number = parseInt(this.dataDirective.id, 10);
      this.directiveService.update(this.dataDirective.id, modelo).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            text: 'Directiva '+modelo.nombre+' editado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          // this.mostrarAlerta("Perfil de directiva editado", "Listo");
          this.dialogReferencia.close('editado');
        },
        error: (e) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            text: 'No se pudo editar la directiva '+ modelo.nombre +'. '+ e,
            showConfirmButton: false,
            timer: 2500,
          });
          // this.mostrarAlerta("No se pudo editar", "Error");
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.dataDirective) {
      this.formDirective.patchValue({
        nombre: this.dataDirective.nombre,
        descripcion: this.dataDirective.descripcion,
        rango_tiempo: this.dataDirective.rango_tiempo,
      });
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.iconAccion = 'edit';
    }
  }
}
