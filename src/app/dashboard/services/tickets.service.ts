import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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

    public count(): Observable<{totalCountTickets: number}>{
      return this.httpClient.get<any>(`${this.ticketURL}count`);
    }

    public detail(id: string): Observable<Ticket> {
        return this.httpClient.get<Ticket>(`${this.ticketURL}${id}`)
        .pipe(
          catchError((err) => throwError(() => err.error.message))
        );
    }

    public save(ticket: any): Observable<Ticket> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.httpClient.post<Ticket>(`${this.ticketURL}create`, ticket,{headers})
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
}
