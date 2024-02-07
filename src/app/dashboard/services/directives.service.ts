import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Directive } from '../interfaces/directives';
// import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class DirectivaService {
     url = environment.baseURL;
     directiveURL = this.url+"/directives/"

    constructor(private httpClient: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }


    public lista(): Observable<Directive[]> {
          const headers = this.getHeaders();
        return this.httpClient.get<Directive[]>(`${this.directiveURL}all`, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public count(): Observable<{totalCountDirectives: number}>{
          const headers = this.getHeaders();

      return this.httpClient.get<any>(`${this.directiveURL}count`, {headers});
    }

    public detail(id: string): Observable<Directive> {
          const headers = this.getHeaders();

        return this.httpClient.get<Directive>(`${this.directiveURL}${id}`, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    save(directiva: any): Observable<Directive> {
          const headers = this.getHeaders();

      return  this.httpClient.post<Directive>(`${this.directiveURL}create`, directiva, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public update(id: string, directiva: any): Observable<Directive> {
          const headers = this.getHeaders();

        return this.httpClient.patch<Directive>(`${this.directiveURL}edit/${id}`, directiva, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public delete(id: string): Observable<any> {
          const headers = this.getHeaders();

        return this.httpClient.delete<any>(`${this.directiveURL}delete/${id}`, {headers})
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

}
