import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Estableishment } from '../interfaces/estableishments';

// import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class EstablecimientoService {

  url = environment.baseURL;
  estableishmentURL = this.url+"/estableishments/";


    constructor(private httpClient: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    public lista(): Observable<Estableishment[]> {

        return this.httpClient.get<Estableishment[]>(`${this.estableishmentURL}all`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public count(): Observable<{totalCountEstableishments: number}>{
      const headers = this.getHeaders();

      return this.httpClient.get<any>(`${this.estableishmentURL}count`, {headers});
    }

    public detail(id: string): Observable<Estableishment> {
      const headers = this.getHeaders();

        return this.httpClient.get<Estableishment>(`${this.estableishmentURL}${id}`, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public save(establecimiento: any): Observable<Estableishment> {
          const headers = this.getHeaders();

        return this.httpClient.post<Estableishment>(`${this.estableishmentURL}create`, establecimiento, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public update(id: string, body: any): Observable<Estableishment> {
          const headers = this.getHeaders();

        return this.httpClient.patch<Estableishment>(`${this.estableishmentURL}edit/${id}`, body, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public delete(id: string): Observable<any> {
          const headers = this.getHeaders();

        return this.httpClient.delete<any>(`${this.estableishmentURL}delete/${id}`, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public getCount(): Observable<number> {
      return this.httpClient.get<number>(`${this.estableishmentURL}allnum`);
    }


}
