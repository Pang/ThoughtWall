import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedInService } from '../services/logged-in.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  register: any = {};
  login: any = {};
  errorMsg = [];
  loggedIn: boolean;

  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient, private loggedInService: LoggedInService) {
    this.loggedIn = loggedInService.loggedIn();
  }

  registerUser() {
    this.errorMsg = [];
    return this.http.post(this.apiUrl + '/register', this.register).subscribe(
      res => console.log('success'),
      fail => {
        console.log(fail);
      }
    );
  }

  loginUser() {
    this.errorMsg = [];
    return this.http.post(this.apiUrl + '/login', this.login).subscribe(
      res => {
        localStorage.setItem('token', res['token']),
        console.log(res);
      },
      fail => console.log(fail)
    );
  }

  logout() {
    console.log("YO");
    localStorage.removeItem('token');
  }
}
