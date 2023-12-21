import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http'
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

    public lista(): Observable<Directive[]> {
        return this.httpClient.get<Directive[]>(`${this.directiveURL}all`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public detail(id: string): Observable<Directive> {
        return this.httpClient.get<Directive>(`${this.directiveURL}${id}`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    save(directiva: any): Observable<Directive> {
      return  this.httpClient.post<Directive>(`${this.directiveURL}create`, directiva)
      .pipe(
        catchError((err) => throwError(() => err.error.message))
      );
    }

    public update(id: string, directiva: any): Observable<Directive> {
        return this.httpClient.patch<Directive>(`${this.directiveURL}edit/${id}`, directiva)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public delete(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.directiveURL}delete/${id}`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

//     confirmDelete(message: string, callback: any){
//         Swal.fire({
//           icon: 'question',
//           title:  'ADVERTENCIA',
//           html: message,
//           showCancelButton: true,
//           focusConfirm: false,
//           reverseButtons: true,
//           confirmButtonText:
//             '<span class="ion-padding-horizontal"></span> Si <span class="ion-padding-horizontal"></span> ',
//           confirmButtonAriaLabel: 'Si',
//           cancelButtonText:
//             '<span class="ion-padding-horizontal"></span>  No <span class="ion-padding-horizontal"></span> ',
//           cancelButtonAriaLabel: 'No',
//           heightAuto: false,
//         }).then((result) => {
//           if (result.isConfirmed) {
//             callback();
//           }
//         });
//       }

//     messageApi(title: string, message: string, type: 'warning' | 'success' | 'error' | 'info' | 'question') {
//         Swal.fire({
//           icon: type,
//           title,
//           html: message,
//           confirmButtonText: 'Aceptar'
//         })
//     }
}
