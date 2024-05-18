import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { Subscription, filter, map } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';


@Component({
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit{
  public tituloSubs: Subscription;
  public titulo: string = '';
  imageUrl: string = '';
  anioActual: number = new Date().getFullYear();

  constructor(
    @Inject(BreakpointObserver) private observer: BreakpointObserver,
    private router: Router,

  ){
    this.tituloSubs = this.getArgumentosRuta().subscribe(
      ({titulo}) => {
        this.titulo = titulo;
        document.title = `Mesa de Ayuda - ${titulo}`;
      }
    )
  }

  ngOnInit(): void {
    this.imageUrl = 'https://soporte.mspz3.gob.ec:8083/api/tickets/logo/logo.png';
  }

  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd && event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data ),
    )
  }

}
