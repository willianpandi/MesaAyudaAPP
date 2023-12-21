import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Ticket } from '../interfaces/tickets';
// import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class TicketService {

  url = environment.baseURL;
  ticketURL =  this.url+"/tickets/";


    constructor(private httpClient: HttpClient) { }

    public lista(): Observable<Ticket[]> {
        return this.httpClient.get<Ticket[]>(`${this.ticketURL}all`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public detail(id: string): Observable<Ticket> {
        return this.httpClient.get<Ticket>(`${this.ticketURL}${id}`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public save(id_u : string, id_d: string ,ticket: any): Observable<Ticket> {
        return this.httpClient.post<Ticket>(`${this.ticketURL}create/${id_u}/${id_d}`, ticket)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public update(id: string, ticket: any): Observable<Ticket> {
        return this.httpClient.patch<Ticket>(`${this.ticketURL}edit/${id}`, ticket)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public delete(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.ticketURL}delete/${id}`)
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
