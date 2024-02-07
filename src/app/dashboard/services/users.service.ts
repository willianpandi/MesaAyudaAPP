import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Profile } from '../interfaces/users';
import { TicketDetalle } from '../interfaces/tickets';

// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.baseURL;
  profileURL = this.url+"/users/";

  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public lista(): Observable<Profile[]> {
    const headers = this.getHeaders();

    return this.httpClient.get<Profile[]>(`${this.profileURL}all`, {headers});
  }
  public listaSoporte(): Observable<Profile[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Profile[]>(`${this.profileURL}all/soportes`, {headers});
  }


  public count(): Observable<{totalCountUsers: number}>{
    const headers = this.getHeaders();

    return this.httpClient.get<any>(`${this.profileURL}count`, {headers});
  }

  public detail(id: string): Observable<Profile> {
    const headers = this.getHeaders();

      return this.httpClient.get<Profile>(`${this.profileURL}${id}`, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public save(id: string, body: any): Observable<Profile> {
    const headers = this.getHeaders();

      return this.httpClient.post<Profile>(`${this.profileURL}create/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


  public update(id: string, body: any): Observable<Profile> {
    const headers = this.getHeaders();

      return this.httpClient.patch<Profile>(`${this.profileURL}edit/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }
  public updatePassword(body: any): Observable<Profile> {
    const headers = this.getHeaders();

      return this.httpClient.put<Profile>(`${this.profileURL}password`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public delete(id: string): Observable<any> {
    const headers = this.getHeaders();

      return this.httpClient.delete<any>(`${this.profileURL}delete/${id}`,{headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


}
