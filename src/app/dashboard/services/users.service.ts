import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Profile } from '../interfaces/users';

// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.baseURL;
  profileURL = this.url+"/users/";


  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Profile[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Profile[]>(`${this.profileURL}all`, {headers});
  }

  public count(): Observable<{totalCountUsers: number}>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(`${this.profileURL}count`, {headers});
  }

  public detail(id: string): Observable<Profile> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get<Profile>(`${this.profileURL}${id}`, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public save(id: string, body: any): Observable<Profile> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.post<Profile>(`${this.profileURL}create/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


  public update(id: string, body: any): Observable<Profile> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.patch<Profile>(`${this.profileURL}edit/${id}`, body, {headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public delete(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.delete<any>(`${this.profileURL}delete/${id}`,{headers})
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


}
