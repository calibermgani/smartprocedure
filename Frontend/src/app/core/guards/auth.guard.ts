import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

// import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private route : ActivatedRoute
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (environment.defaultauth === 'firebase') {
    //     const currentUser = this.authenticationService.currentUser();
    //     if (currentUser) {
    //         // logged in so return true
    //         return true;
    //     }
    // } else {
    const currentUser = this.authFackservice.currentUserValue;
    if (currentUser) {
         return true;
    }
    // else {
    //   this.router.navigate(['/account/auth/login']);
    // }
    // }
    // not logged in so redirect to login page with the return url  { queryParams: { returnUrl: state.url } }
    this.router.navigate(['/account/auth/login']);
    return false;
  }
}
