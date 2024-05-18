import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageUrl: string = 'assets/images/LOGO-MSP-1.png';

  url = environment.baseURL;
  filesURL =  this.url+"/tickets/";
  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  saveLogo(file: File): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }
    return this.httpClient.post<any>(`${this.filesURL}logo`, formData, {headers})
    .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  getLogo(logoName:string) {
    return this.httpClient.get(`${this.filesURL}logo/${logoName}`);
  }
}
