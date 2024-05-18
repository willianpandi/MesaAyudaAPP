import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ImageService } from '../../../service/ImageService.service';
import { Subscription, filter, map } from 'rxjs';
import Swal from 'sweetalert2';

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

  anioActual: number = new Date().getFullYear();

  //header
  public headerItems = [
    { label: 'Mi Perfil', icon: 'account_circle', url: './profile'},
    { label: 'Ajustes', icon: 'settings', url: './settings'},
  ];

  //Lista de Opciones

  public sidebarItemsSoporte = [
    { label: 'Inicio', icon: 'home', url: './home'},
    { label: 'Mis Tickets', icon: ' assignment', url: './assigned-tickets'},

  ];
  public sidebarItemsAdmin = [
    { label: 'Inicio', icon: 'home', url: './home'},
    { label: 'Reportes', icon: 'description', url: './reports'},
    { label: 'Usuarios', icon: 'supervisor_account', url: './users'},
    { label: 'Temas Ayuda', icon: 'list_alt', url: './categories'},
    { label: 'EODs', icon: 'business', url: './eods'},
  ];


  // Sidenav Responsivo

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    @Inject(BreakpointObserver) private observer: BreakpointObserver,
    private cd:ChangeDetectorRef,
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
    // this.imageUrl = 'http://localhost:8000/api/tickets/logo/logo.png';
    this.imageUrl = 'https://soporte.mspz3.gob.ec:8083/api/tickets/logo/logo.png';
    this.verificarRol();
  }

  verificarRol(){
    this.rolAdmin = true;
  }


  ngAfterViewInit() {
    this.observer.observe(['(max-width: 992px)']).subscribe((res) => {
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
    Swal.fire({
      title: '¿SALIR?',
      html: `¿Esta seguro que quiere salir?`,
      icon: 'question',
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: 'Si, Salir!',
      cancelButtonText: 'No',
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#FF5252',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}


