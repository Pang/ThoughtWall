import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account/account.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  usersThreads = [];
  usersComments = [];

  get uniqueName() {
    return this.accountService.getUniqueName;
  }
  
  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.getUsersThreads(this.accountService.getUserId)
      .subscribe(
        data => this.usersThreads = data
      );
    this.accountService.getUsersComments(this.accountService.getUserId)
      .subscribe(
        data => this.usersComments = data
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
