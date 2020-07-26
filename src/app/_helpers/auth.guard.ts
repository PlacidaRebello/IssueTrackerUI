import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private url: string;
  constructor( private router:Router,private userService:UserService) {
  }

  private notAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      return true;
    }
    this.router.navigate(['/Login']);
    return false;
  }

  private isLoginOrRegister(): boolean {
    if (this.url.includes('/Login') || this.url.includes('/Register')) {
      return true;
    }
    return false;
  }
  //if user is not authenticated and tries to acces any toher page other than login/reg he is redirected to login
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.url = state.url;
    if (!this.userService.checkLoginStatus()) {
     return this.notAuthState();
    }
    return true;
  }
  
}
