import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../_services/auth.service';
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

  constructor(private authService: AuthService, private router: Router) {
    this.decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    console.log(this.decodedToken);
    this.authService.getUsersThreads(this.decodedToken['nameid'])
      .subscribe(
        x => this.usersThreads = x
      );
    this.authService.getUsersComments(this.decodedToken['nameid'])
      .subscribe(
        x => { this.usersComments = x; console.log(this.usersComments) }
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
