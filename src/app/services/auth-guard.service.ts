import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    var isAuthenticated = await this.authService.isAuthenticated();
    console.log('isAuthenticated', isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }

    this.authService.getUser().subscribe((data) => {
      console.log(data);
      this.authService.setUserData(data);
    });

    return isAuthenticated;
  }
}
