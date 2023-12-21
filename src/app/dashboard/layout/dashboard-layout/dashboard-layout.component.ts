import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../../components/dialogs/ticket-dialog/ticket-dialog.component';
import { ImageService } from 'src/app/service/ImageService.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit {
  private authService = inject( AuthService);
  public user = computed(()=> this.authService.currentUser());
  private imageService = inject( ImageService);
  imageUrl: string = '';

  //Lista de Opciones

  public sidebarItems = [
    { label: 'Inicio', icon: 'home', url: './home'},
    { label: 'Tickets', icon: 'view_list', url: './tickets'},
    { label: 'Reportes', icon: ' insert_chart', url: './reports'},
    { label: 'Mi Perfil', icon: 'account_circle', url: './profile'},
    { label: 'Ajustes', icon: 'settings', url: './settings'},
  ];

  public headerItems = [
    { label: 'Mi Perfil', icon: 'account_circle', url: './profile'},
    { label: 'Ajustes', icon: 'settings', url: './settings'},
  ];

  public tableItems = [
    { label: 'Usuario', icon: 'table_chart', url: './users'},
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

     ){}



  ngOnInit(): void {
    this.imageUrl = this.imageService.getImageUrl();
  }

  ticketDialog(){
    this.dialog.open(TicketDialogComponent, {
      disableClose: true,
      width:"800px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
      }
    })
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if ( res.matches ){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    // Error de Angular
    this.cd.detectChanges();
  }


  onLogout(): void{
    this.authService.logout();
  }
}
