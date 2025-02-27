import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/Auth.Service';

@Injectable({providedIn: 'root'})
export class AuthPagesGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.checkAuthentication()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
