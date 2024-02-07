import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/service/ImageService.service';

@Component({
  selector: 'app-files-dialog',
  templateUrl: './files-dialog.component.html',
  styleUrls: ['./files-dialog.component.css']
})
export class FilesDialogComponent {

  formTicket!: FormGroup;
  selectedFileName: any = null;
  constructor(
    private dialogReferencia: MatDialogRef<FilesDialogComponent>,
    private fileService: ImageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  // handleFileInput(event: any): void {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     this.selectedFileName = files[0].name;
  //     // Realiza las acciones necesarias con los archivos seleccionados
  //     console.log(files);
  //     }
  //   }

  imagenPrevia: any;
  files: any = []
  loading!: boolean;

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.fileService.saveImage(formData, this.data.id ).subscribe(
        response => {
          console.log('response', response);


        }
        )
      }
    }

  subirImagen(){
    this.dialogReferencia.close('subido');
    // this.fileService.saveImage(imagen, 'b52c5079-054a-4dd3-85ef-0f89804a1721');
  }
}

