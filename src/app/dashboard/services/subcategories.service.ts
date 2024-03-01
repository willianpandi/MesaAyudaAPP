import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { SubCategory } from '../interfaces/category';
import { SubCategoryReports } from '../interfaces/reports';

@Injectable({
    providedIn: 'root'
})
export class SubCategoryService {
     url = environment.baseURL;
     subCategoryURL = this.url+"/sub-category/"

    constructor(private httpClient: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }


    public lista(): Observable<SubCategory[]> {
        return this.httpClient.get<SubCategory[]>(`${this.subCategoryURL}all`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public count(): Observable<{totalCountCategories: number}>{
      const headers = this.getHeaders();
      return this.httpClient.get<any>(`${this.subCategoryURL}count`, {headers});
    }


    public reports(mes?:any, anio?:any): Observable<SubCategoryReports[]> {
      const headers = this.getHeaders();
      let params = new HttpParams();
      if (mes !== undefined) {
        params = params.set('mes', mes);
      }
      if (anio !== undefined) {
        params = params.set('anio', anio);
      }

      return this.httpClient.get<SubCategoryReports[]>(`${this.subCategoryURL}reports`, {headers, params})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public save(body: any): Observable<SubCategory> {
          const headers = this.getHeaders();

      return  this.httpClient.post<SubCategory>(`${this.subCategoryURL}create`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public update(id: string, body: any): Observable<SubCategory> {
          const headers = this.getHeaders();

        return this.httpClient.patch<SubCategory>(`${this.subCategoryURL}edit/${id}`, body, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public delete(id: string): Observable<any> {
        const headers = this.getHeaders();
        return this.httpClient.delete<any>(`${this.subCategoryURL}delete/${id}`, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

}
