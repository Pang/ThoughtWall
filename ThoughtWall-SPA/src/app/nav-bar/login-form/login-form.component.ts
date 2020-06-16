import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  template: `
    <form class="dataForm" [formGroup]="loginForm" (ngSubmit)="loginUser()">
      <h2>Login</h2>
      <input formControlName="username" autocomplete="off" type="text" placeholder="Username"><br>
      <input formControlName="password" type="password" placeholder="Password"><br>
      <button type="submit">Submit</button>

      <div style="color: white" *ngIf="isError">Invalid login details</div>
    </form>
  `,
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  isError: boolean;
  errorMsg: string;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.loginService.createForm();
  }

  loginUser() {
    this.loginService.post(this.loginForm.value).subscribe(
      res => {
        // TODO put Token into state (NGRX)
        localStorage.setItem('token', res[`token`]),
        this.router.navigate(['/']);
      },
      () => {
        this.isError = true;
        this.errorMsg = 'Could not log in';
      }
    );
  }
}
