import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return (!this.userService.isLogedin()) ? : true;

    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }


}
