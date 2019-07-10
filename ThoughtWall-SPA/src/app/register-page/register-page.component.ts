import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
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
}
