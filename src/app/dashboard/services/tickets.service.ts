import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Ticket, TicketDetalle } from '../interfaces/tickets';
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  url = environment.baseURL;
  ticketURL = this.url + '/tickets/';

  constructor(private httpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public lista(): Observable<Ticket[]> {
    const headers = this.getHeaders();
    return this.httpClient
      .get<Ticket[]>(`${this.ticketURL}all`, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public count(): Observable<{ totalCountTickets: number }> {
    const headers = this.getHeaders();

    return this.httpClient.get<any>(`${this.ticketURL}count`, { headers });
  }

  public detail(id: string): Observable<Ticket> {
    const headers = this.getHeaders();

    return this.httpClient
      .get<Ticket>(`${this.ticketURL}${id}`, { headers })
      .pipe(
        map((resp) => resp),
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public listaDetalle(id: string): Observable<TicketDetalle[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<TicketDetalle[]>(`${this.ticketURL}detalle/${id}`, {headers});
  }

  public saveDetalle(id: string, body: TicketDetalle): Observable<TicketDetalle> {
    const headers = this.getHeaders();

    return this.httpClient
      .post<any>(`${this.ticketURL}create/detalle/${id}`, body, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }


  public save(ticket: any, file?: File): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }

    Object.keys(ticket).forEach(key => {
      formData.append(key, ticket[key]);
    });


    return this.httpClient
      .post<any>(`${this.ticketURL}create`, formData, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public update(id: string, ticket: any): Observable<Ticket> {
    const headers = this.getHeaders();

    return this.httpClient
      .patch<Ticket>(`${this.ticketURL}edit/${id}`, ticket, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public delete(id: string): Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient
      .delete<any>(`${this.ticketURL}delete/${id}`, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }
}
