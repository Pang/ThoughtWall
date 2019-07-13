import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  register: any = {};
  login: any = {};
  errorMsg = [];

  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}

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

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
