import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { SmallEstableishment } from '../interfaces/districts';
import { environment } from '../../../environments/environments';
import { Estableishment } from '../interfaces/estableishments';


@Injectable({
    providedIn: 'root'
})
export class DistrictService {

    url = environment.baseURL;
    districtsURL = this.url+"/districts/";


    constructor(private httpClient: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    public lista(): Observable<any[]> {
      const headers = this.getHeaders();

        return this.httpClient.get<any[]>(`${this.districtsURL}all`, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public count(): Observable<{totalCountDistrict: number}>{
          const headers = this.getHeaders();

      return this.httpClient.get<any>(`${this.districtsURL}count`, {headers});
    }

    public findEstableishments(id: string): Observable<SmallEstableishment[]> {
      const headers = this.getHeaders();

      return this.httpClient.get<SmallEstableishment[]>(`${this.districtsURL}estableishments/${id}`, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message)),
      );
    }
    public detailes(id: string): Observable<Estableishment[]> {
      return this.httpClient.get<Estableishment[]>(`${this.districtsURL}${id}`)
      .pipe(
        catchError((err) => throwError(() => err.error.message)),
      );
    }

    public save(body: any): Observable<any> {
          const headers = this.getHeaders();

        return this.httpClient.post<any>(`${this.districtsURL}create`, body, {headers})
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
