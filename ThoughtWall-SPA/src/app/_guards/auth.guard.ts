import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../components/account/_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean {
    if (this.accountService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/account']);
      return false;
    }
  }
}
