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

  registerUser(userToRegister: any) {
    this.errorMsg = [];
    console.log('test');
    return this.http.post(this.apiUrl + '/register', this.register).subscribe(
      res => console.log('success'),
      fail => {
        console.log(fail);
      }
    );
  }

  loginUser(userToLogin: any) {
    this.errorMsg = [];
    console.log('test');
    return this.http.post(this.apiUrl + '/login', this.login).subscribe(
      res => console.log('success'),
      fail => {
        console.log(fail);
      }
    );
  }
}
