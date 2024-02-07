import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { District, SmallDistrict } from '../interfaces/districts';
import { environment } from 'src/environments/environments';
import { Estableishment } from '../interfaces/estableishments';

// import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class DistritoService {

    url = environment.baseURL;
    districtsURL = this.url+"/districts/";


    constructor(private httpClient: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    public lista(): Observable<any[]> {

        return this.httpClient.get<any[]>(`${this.districtsURL}all`,)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public count(): Observable<{totalCountDistrict: number}>{
          const headers = this.getHeaders();

      return this.httpClient.get<any>(`${this.districtsURL}count`, {headers});
    }

    public detail(id: string): Observable<SmallDistrict[]> {
      return this.httpClient.get<any>(`${this.districtsURL}${id}`)
      .pipe(
        catchError((err) => throwError(() => err.error.message)),
      );
    }
    public detailes(id: string): Observable<Estableishment[]> {
      return this.httpClient.get<any>(`${this.districtsURL}${id}`)
      .pipe(
        catchError((err) => throwError(() => err.error.message)),
      );
    }

    public save(distrito: any): Observable<any> {
          const headers = this.getHeaders();

        return this.httpClient.post<any>(`${this.districtsURL}create`, distrito, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public update(id: string, body: any): Observable<any> {
          const headers = this.getHeaders();

        return this.httpClient.patch<any>(`${this.districtsURL}edit/${id}`, body, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public delete(id: string): Observable<any> {
          const headers = this.getHeaders();

        return this.httpClient.delete<any>(`${this.districtsURL}delete/${id}`, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }


}
