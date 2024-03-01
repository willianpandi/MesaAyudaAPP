import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Estableishment } from '../interfaces/estableishments';
import { SubCategoryReports } from '../interfaces/reports';


@Injectable({
    providedIn: 'root'
})
export class EstableishmentService {

  url = environment.baseURL;
  estableishmentURL = this.url+"/estableishments/";


    constructor(private httpClient: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    public lista(): Observable<Estableishment[]> {
      const headers = this.getHeaders();

        return this.httpClient.get<Estableishment[]>(`${this.estableishmentURL}all`, {headers})
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

    public reportsEod(id: string, mes?:any, anio?:any): Observable<SubCategoryReports[]> {
      const headers = this.getHeaders();
      let params = new HttpParams();
      if (mes !== undefined) {
        params = params.set('mes', mes);
      }
      if (anio !== undefined) {
        params = params.set('anio', anio);
      }

      return this.httpClient.get<SubCategoryReports[]>(`${this.estableishmentURL}reports-eod/${id}`, {headers, params})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public reports(id: string, mes?:any, anio?:any): Observable<SubCategoryReports[]> {
      const headers = this.getHeaders();
      let params = new HttpParams();
      if (mes !== undefined) {
        params = params.set('mes', mes);
      }
      if (anio !== undefined) {
        params = params.set('anio', anio);
      }

      return this.httpClient.get<SubCategoryReports[]>(`${this.estableishmentURL}reports/${id}`, {headers, params})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public save(body: any): Observable<Estableishment> {
          const headers = this.getHeaders();

        return this.httpClient.post<Estableishment>(`${this.estableishmentURL}create`, body, {headers})
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
