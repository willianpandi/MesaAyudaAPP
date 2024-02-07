import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from 'src/app/service/ImageService.service';
import { Subscription, filter, map } from 'rxjs';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit {
  private authService = inject( AuthService);
  public user = computed(()=> this.authService.currentUser());
  private imageService = inject( ImageService);
  imageUrl: string = '';
  public titulo: string = '';
  public tituloSubs: Subscription;

  public imagen: boolean = true;

  public rolAdmin: boolean = true;

  //header
  public headerItems = [
    // { label: 'Nuevo Ticket', icon: 'add_box', url: './ticket/nuevo'},
    { label: 'Mi Perfil', icon: 'account_circle', url: './profile'},
    { label: 'Ajustes', icon: 'settings', url: './settings'},
  ];

  //Lista de Opciones

  public sidebarItemsUser = [
    { label: 'Inicio', icon: 'home', url: './home'},
    { label: 'Nuevo Ticket', icon: 'add_box', url: './ticket/nuevo'},
    { label: 'Mis Tickets', icon: 'view_list', url: './tickets'},
    { label: 'Tickets', icon: ' insert_chart', url: './reports'},
    { label: 'Mi Perfil', icon: 'account_circle', url: './profile'},
    { label: 'Ajustes', icon: 'settings', url: './settings'},
  ];

  public sidebarItemsSoporte = [
    { label: 'Inicio', icon: 'home', url: './home'},
    // { label: 'Reportes', icon: ' insert_chart', url: './reports'},
    { label: 'Tickets', icon: ' view_list', url: './reports'},
    { label: 'Mi Perfil', icon: 'account_circle', url: './profile'},
    { label: 'Ajustes', icon: 'settings', url: './settings'},
    { label: 'Usuarios', icon: 'table_chart', url: './users'},
    { label: 'Establecimientos', icon: 'table_chart', url: './establishments'},
    { label: 'Distritos', icon: 'table_chart', url: './districts'},
    { label: 'Directivas', icon: 'table_chart', url: './directives'},
  ];
  public sidebarItemsAdmin = [
    { label: 'Inicio', icon: 'home', url: './home'},
    // { label: 'Nuevo Ticket', icon: 'add_box', url: './ticket/nuevo'},
    // { label: 'Reportes', icon: ' insert_chart', url: './reports'},
    { label: 'Mi Perfil', icon: 'account_circle', url: './profile'},
    { label: 'Ajustes', icon: 'settings', url: './settings'},
    { label: 'Tickets', icon: 'table_chart', url: './tickets'},
    { label: 'Usuarios', icon: 'table_chart', url: './users'},
    { label: 'Establecimientos', icon: 'table_chart', url: './establishments'},
    { label: 'Distritos', icon: 'table_chart', url: './districts'},
    { label: 'Directivas', icon: 'table_chart', url: './directives'},
  ];


  // Sidenav Responsivo

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    @Inject(BreakpointObserver) private observer: BreakpointObserver,
    private cd:ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,

     ){

      this.tituloSubs = this.getArgumentosRuta()
                        .subscribe( ({titulo}) => {
                          this.titulo = titulo;
                          document.title = `Mesa de Ayuda - ${titulo}`;
                      })
     }



  ngOnInit(): void {
    this.imageUrl = 'http://localhost:8000/api/tickets/logo/logo.png';
    this.verificarRol();
  }

  verificarRol(){
    // console.log( this.user!.rol );

      this.rolAdmin = true;

    // if (this.user && this.user.value && this.user.value.rol === 'ADMIN') {
    //   this.rolAdmin = true;
    // }
  }


  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if ( res.matches ){
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.imagen = false;
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.imagen = true;
      }
    });

    // Error de Angular
    this.cd.detectChanges();
  }

  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd && event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data ),
    )

  }
  onLogout(): void{
    this.authService.logout();
  }
}


