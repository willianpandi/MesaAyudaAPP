import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
// import { Files } from '../dashboard/interfaces/tickets';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  // private imageUrl: string = 'assets/images/logo.png'; // Aquí colocas la URL inicial de tu imagen
  private imageUrl: string = 'assets/images/LOGO-MSP-1.png'; // Aquí colocas la URL inicial de tu imagen

  url = environment.baseURL;
  filesURL =  this.url+"/tickets/";
  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  saveImage(formData: FormData, id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post(`${this.filesURL}files/${id}`, formData, {headers});
  }

  getImages(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get(`${this.filesURL}files/${id}`, {headers});
  }

  saveLogo(file: File): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }
    console.log({fordata: formData});

    return this.httpClient.post<any>(`${this.filesURL}logo`, formData, {headers})
    .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  getLogo(logoName:string) {
    return this.httpClient.get(`${this.filesURL}logo/${logoName}`);
  }
}
