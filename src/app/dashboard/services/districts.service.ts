import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { District, SmallEstableishment } from '../interfaces/districts';
import { environment } from '../../../environments/environments';
import { Estableishment } from '../interfaces/estableishments';
import { EstableishmentsReports } from '../interfaces/reports';


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

    public lista(): Observable<District[]> {
      return this.httpClient.get<District[]>(`${this.districtsURL}all-active`)
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public listaAll(): Observable<District[]> {
      const headers = this.getHeaders();
      return this.httpClient.get<District[]>(`${this.districtsURL}all`, {headers})
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

    public reportsEstaByDistrict(id: string, mes?:any, anio?:any): Observable<EstableishmentsReports[]> {
      const headers = this.getHeaders();
      let params = new HttpParams();
      if (mes !== undefined) {
        params = params.set('mes', mes);
      }
      if (anio !== undefined) {
        params = params.set('anio', anio);
      }

      return this.httpClient.get<EstableishmentsReports[]>(`${this.districtsURL}reports/${id}`, {headers, params})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
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
}
