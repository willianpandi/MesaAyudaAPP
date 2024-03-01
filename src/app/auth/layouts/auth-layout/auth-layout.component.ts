import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';
import { Subscription, filter, map } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';


@Component({
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  public tituloSubs: Subscription;
  public titulo: string = '';

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

  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd && event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data ),
    )
  }

}
