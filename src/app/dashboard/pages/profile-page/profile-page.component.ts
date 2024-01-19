import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  private authService = inject( AuthService);
  public user = computed(()=> this.authService.currentUser());
  panelOpenState = true;

}
