import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  decodedToken = {};
  register: any = {};
  login: any = {};
  errorMsg = [];
  usersThreads = [];
  usersComments = [];
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

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
        this.router.navigate(['/']);
      },
      fail => console.log(fail)
    );
  }

}
