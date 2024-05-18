import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Ticket } from '../interfaces/tickets';
import { TicketsReports } from '../interfaces/reports';

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

  public lista(inicio?: Date, fin?: Date): Observable<Ticket[]> {
    const headers = this.getHeaders();
    let params = new HttpParams();
    if (inicio !== undefined) {
      params = params.set('inicio', inicio.toISOString());
    }
    if (fin !== undefined) {
      params = params.set('fin', fin.toISOString());
    }
    return this.httpClient
      .get<Ticket[]>(`${this.ticketURL}all`, { headers, params })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public listaTickets(cedula: string): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${this.ticketURL}tickets/${cedula}`)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public listTicketsReasig(): Observable<Ticket[]> {
    const headers = this.getHeaders();
    return this.httpClient
      .get<Ticket[]>(`${this.ticketURL}reasig-tickets`, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public listTicketsReasigClose(): Observable<Ticket[]> {
    const headers = this.getHeaders();
    return this.httpClient
      .get<Ticket[]>(`${this.ticketURL}reasig-close-tickets`, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public reports(mes?: any, anio?: any): Observable<TicketsReports[]> {
    const headers = this.getHeaders();
    let params = new HttpParams();
    if (mes !== undefined) {
      params = params.set('mes', mes);
    }
    if (anio !== undefined) {
      params = params.set('anio', anio);
    }
    return this.httpClient
      .get<TicketsReports[]>(`${this.ticketURL}reports`, { headers, params })
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

  public search(id: string): Observable<Ticket> {
    return this.httpClient
      .get<Ticket>(`${this.ticketURL}search/${id}`)
      .pipe(
        map((resp) => resp),
        catchError((err) => throwError(() => err.error.message))
      );
  }

  public save(ticket: any, file?: File): Observable<any> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }

    Object.keys(ticket).forEach(key => {
      formData.append(key, ticket[key]);
    });


    return this.httpClient
      .post<any>(`${this.ticketURL}create`, formData)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public createTicket(body: any): Observable<any> {
    const headers = this.getHeaders();


    return this.httpClient
      .post<any>(`${this.ticketURL}create-ticket`, body , {headers})
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public update(id: string, ticket: any): Observable<Ticket> {
    const headers = this.getHeaders();

    return this.httpClient
      .patch<Ticket>(`${this.ticketURL}edit/${id}`, ticket, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public updateCloseTicket(id: string, ticket: any): Observable<Ticket> {
    const headers = this.getHeaders();

    return this.httpClient
      .patch<Ticket>(`${this.ticketURL}edit-close/${id}`, ticket, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public updateReasigTicket(id: string, ticket: any): Observable<Ticket> {
    const headers = this.getHeaders();

    return this.httpClient
      .patch<Ticket>(`${this.ticketURL}edit-reasig/${id}`, ticket, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  public updateDepartTicket(id: string, ticket: any): Observable<Ticket> {
    const headers = this.getHeaders();
    return this.httpClient
      .patch<Ticket>(`${this.ticketURL}edit-departamento/${id}`, ticket, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }
}
