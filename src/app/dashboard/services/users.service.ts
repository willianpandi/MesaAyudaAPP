import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/users';
import { Ticket } from '../interfaces/tickets';
import { Estableishment } from '../interfaces/estableishments';
import { Category } from '../interfaces/category';
import { UsersReports } from '../interfaces/reports';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseURL;
  userUrl = this.url+"/users/";

  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public lista(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<User[]>(`${this.userUrl}all`, {headers});
  }

  public findEstableishments(id: string): Observable<Estableishment[]> {
    return this.httpClient.get<Estableishment[]>(`${this.userUrl}estableishments-user/${id}`)
    .pipe(
      catchError((err) => throwError(() => err.error.message)),
    );
  }

  public listaSoportes(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<User[]>(`${this.userUrl}supports`, {headers});
  }

  public listaEstableishments(id: string): Observable<Estableishment[]> {
    const headers = this.getHeaders();
      return this.httpClient.get<Estableishment[]>(`${this.userUrl}estableishments/${id}`, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public listaCategories(id: string): Observable<Category[]> {
    const headers = this.getHeaders();
      return this.httpClient.get<Category[]>(`${this.userUrl}categories/${id}`, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public listCategoriesAsig(): Observable<Category[]> {
    const headers = this.getHeaders();
      return this.httpClient.get<Category[]>(`${this.userUrl}categories`, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public listTickets(): Observable<Ticket[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Ticket[]>(`${this.userUrl}tickets`, {headers});
  }

  public listNewTickets(): Observable<Ticket[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Ticket[]>(`${this.userUrl}newtickets`, {headers});
  }


  public count(): Observable<{totalCountUsers: number}>{
    const headers = this.getHeaders();
    return this.httpClient.get<any>(`${this.userUrl}count`, {headers});
  }

  public detail(id: string): Observable<User> {
    const headers = this.getHeaders();
      return this.httpClient.get<User>(`${this.userUrl}${id}`, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public reports(mes?:any, anio?:any): Observable<UsersReports[]> {
    const headers = this.getHeaders();
    let params = new HttpParams();
    if (mes !== undefined) {
      params = params.set('mes', mes);
    }
    if (anio !== undefined) {
      params = params.set('anio', anio);
    }

  return this.httpClient.get<UsersReports[]>(`${this.userUrl}reports`, {headers, params})
  .pipe(
    catchError((err) => throwError(() => err.error.message))
  );
}

  public save(body: any): Observable<User> {
    const headers = this.getHeaders();
      return this.httpClient.post<User>(`${this.userUrl}create/`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


  public update(id: string, body: any): Observable<User> {
    const headers = this.getHeaders();
      return this.httpClient.patch<User>(`${this.userUrl}edit/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public addEstableishment(id: string, body: any): Observable<any> {
    const headers = this.getHeaders();
      return this.httpClient.patch<any>(`${this.userUrl}add-estableishment/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public removeEstableishment(id: string, body: any): Observable<any> {
    const headers = this.getHeaders();
      return this.httpClient.patch<any>(`${this.userUrl}remove-estableishment/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public addCategory(id: string, body: any): Observable<any> {
    const headers = this.getHeaders();
      return this.httpClient.patch<any>(`${this.userUrl}add-category/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public removeCategoryt(id: string, body: any): Observable<any> {
    const headers = this.getHeaders();
      return this.httpClient.patch<any>(`${this.userUrl}remove-category/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public resetPassword(id: string, newPass: string): Observable<any> {
    const headers = this.getHeaders();

      return this.httpClient.put<any>(`${this.userUrl}reset-password/${id}/${newPass}`,null, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public updatePassword(body: any): Observable<User> {
    const headers = this.getHeaders();
      return this.httpClient.put<User>(`${this.userUrl}password`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


  public delete(id: string): Observable<any> {
    const headers = this.getHeaders();
      return this.httpClient.delete<any>(`${this.userUrl}delete/${id}`,{headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


}
