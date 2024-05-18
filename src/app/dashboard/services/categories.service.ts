import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Category, SmallSubCategory } from '../interfaces/category';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {
     url = environment.baseURL;
     categoryURL = this.url+"/categories/"

    constructor(private httpClient: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }


    public lista(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.categoryURL}all-active`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public listaAll(): Observable<Category[]> {
      const headers = this.getHeaders();
      return this.httpClient.get<Category[]>(`${this.categoryURL}all`, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public findSubcategories(id: string): Observable<SmallSubCategory[]> {
      return this.httpClient.get<SmallSubCategory[]>(`${this.categoryURL}sub-category/${id}`)
      .pipe(
        catchError((err) => throwError(() => err.error.message)),
      );
    }

    public count(): Observable<{totalCountCategories: number}>{
      const headers = this.getHeaders();
      return this.httpClient.get<any>(`${this.categoryURL}count`, {headers});
    }

    public save(body: any): Observable<Category> {
          const headers = this.getHeaders();

      return  this.httpClient.post<Category>(`${this.categoryURL}create`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public update(id: string, body: any): Observable<Category> {
          const headers = this.getHeaders();

        return this.httpClient.patch<Category>(`${this.categoryURL}edit/${id}`, body, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }
}
