import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ImageDialogComponent> ) {}

  get imageUrl(): string {
    return this.data.imageUrl;
  }

  closeDialog(): void {
    this.dialogRef.close(); // Cierra el modal
  }
}
