import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import Swal from 'sweetalert2';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  // Swal.fire({
  //   icon: 'error',
  //   text: 'Se ha caducado la sesion, por favor ingrese nuevamente',
  // });

  router.navigateByUrl('/auth/login');

  return false;
};
