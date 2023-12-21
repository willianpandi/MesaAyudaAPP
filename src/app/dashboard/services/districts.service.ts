import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { District, SmallDistrict } from '../interfaces/districts';
import { environment } from 'src/environments/environments';
import { Estableishment } from '../interfaces/estableishments';

// import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class DistritoService {

    url = environment.baseURL;
    districtsURL = this.url+"/districts/";


    constructor(private httpClient: HttpClient) { }

    public lista(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.districtsURL}all`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public detail(id: string): Observable<SmallDistrict[]> {
      return this.httpClient.get<District>(`${this.districtsURL}${id}`)
      .pipe(
        map((district: District) => {
          // Verifica si el campo estableishments es un objeto o un array
          const estableishmentsArray = Array.isArray(district.estableishments)
            ? district.estableishments
            : [district.estableishments];

          // Mapea cada establecimiento a SmallDistrict
          return estableishmentsArray.map(estableishment => ({
            code: estableishment.id,
            nombre: estableishment.nombre,
          }));
        }),
        catchError((err) => throwError(() => err.error.message)),
      );
    }

    public save(distrito: any): Observable<any> {
        return this.httpClient.post<any>(`${this.districtsURL}create`, distrito)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public update(id: string, body: any): Observable<any> {
        return this.httpClient.patch<any>(`${this.districtsURL}edit/${id}`, body)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public delete(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.districtsURL}delete/${id}`)
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
