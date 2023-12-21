import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from '../../services/users.service';
import { ImageService } from 'src/app/service/ImageService.service';

@Component({
  selector: 'app-setting',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  private imageService = inject( ImageService);
  imageUrl: string = '';

  private authService = inject( AuthService);

  public user = computed(()=> this.authService.currentUser());

  constructor(
    private profileService: UsuarioService,
  ){}
  ngOnInit(): void {
    this.image();
  }

  image(){
    this.imageService.setImageUrl('assets/images/mesa_ayuda.jpg')
  }





}
