import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../_services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AccountService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedin()) {
      return true;
    }
    this.router.navigate(['/register']);
    return false;
  }
}
