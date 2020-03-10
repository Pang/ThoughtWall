import { AccountService } from '../_services/account.service';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  helper = new JwtHelperService();
  decodedToken = {};
  usersThreads = [];
  usersComments = [];

  constructor(private accountService: AccountService, private router: Router) {
    this.decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.accountService.getUsersThreads(this.decodedToken['nameid'])
      .subscribe(
        data => this.usersThreads = data
      );
    this.accountService.getUsersComments(this.decodedToken['nameid'])
      .subscribe(
        data => this.usersComments = data
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
