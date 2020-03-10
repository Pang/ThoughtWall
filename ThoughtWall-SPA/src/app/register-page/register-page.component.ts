import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  private apiUrl = 'http://localhost:5000/api/auth';
  loginForm: FormGroup;
  registerForm: FormGroup;
  isError = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    })
  }

  registerUser() {
    return this.http.post(this.apiUrl + '/register', this.registerForm.value).subscribe(
      res => console.log('success'),
      fail => {
        console.log(fail);
      }
    );
  }

  loginUser() {
    return this.http.post(this.apiUrl + '/login', this.loginForm.value).subscribe(
      res => {
        localStorage.setItem('token', res['token']),
        this.router.navigate(['/']);
      },
      fail => this.isError = true
    );
  }

}
