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

  public detail(id: string): Observable<Profile> {
      return this.httpClient.get<Profile>(`${this.profileURL}${id}`)
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public save(id: string, body: any): Observable<Profile> {
      return this.httpClient.post<Profile>(`${this.profileURL}create/${id}`, body)
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


  public update(id: string, body: any): Observable<Profile> {
      return this.httpClient.patch<Profile>(`${this.profileURL}edit/${id}`, body)
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public delete(id: string): Observable<any> {
      return this.httpClient.delete<any>(`${this.profileURL}delete/${id}`)
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
  }


  // login(user: any): Observable<any> {
  //   return this.httpClient.post<any>(`${this.profileURL}`, user);
  // }

  // confirmDelete(message: string, callback: any){
  //     Swal.fire({
  //       icon: 'question',
  //       title:  'ADVERTENCIA',
  //       html: message,
  //       showCancelButton: true,
  //       focusConfirm: false,
  //       reverseButtons: true,
  //       confirmButtonText:
  //         '<span class="ion-padding-horizontal"></span> Si <span class="ion-padding-horizontal"></span> ',
  //       confirmButtonAriaLabel: 'Si',
  //       cancelButtonText:
  //         '<span class="ion-padding-horizontal"></span>  No <span class="ion-padding-horizontal"></span> ',
  //       cancelButtonAriaLabel: 'No',
  //       heightAuto: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         callback();
  //       }
  //     });
  //   }

  // messageApi(title: string, message: string, type: 'warning' | 'success' | 'error' | 'info' | 'question') {
  //     Swal.fire({
  //       icon: type,
  //       title,
  //       html: message,
  //       confirmButtonText: 'Aceptar'
  //     })
  // }
}
