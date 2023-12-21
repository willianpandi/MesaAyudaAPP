import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Estableishment } from '../interfaces/estableishments';

// import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class EstablecimientoService {

  url = environment.baseURL;
  estableishmentURL = this.url+"/estableishments/";


    constructor(private httpClient: HttpClient) { }

    public lista(): Observable<Estableishment[]> {
        return this.httpClient.get<Estableishment[]>(`${this.estableishmentURL}all`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public detail(id: string): Observable<Estableishment> {
        return this.httpClient.get<Estableishment>(`${this.estableishmentURL}${id}`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public save(establecimiento: any): Observable<Estableishment> {
        return this.httpClient.post<Estableishment>(`${this.estableishmentURL}create`, establecimiento)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public update(id: string, body: any): Observable<Estableishment> {
        return this.httpClient.patch<Estableishment>(`${this.estableishmentURL}edit/${id}`, body)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public delete(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.estableishmentURL}delete/${id}`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }



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
