import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageUrl: string = 'assets/images/logo2.png'; // Aquí colocas la URL inicial de tu imagen

  getImageUrl(): string {
    return this.imageUrl;
  }

  setImageUrl(newUrl: string): void {
    this.imageUrl = newUrl;
  }
}
