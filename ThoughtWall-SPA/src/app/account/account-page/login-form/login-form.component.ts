import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/_services/account/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  template: `
      <form class="dataForm" [formGroup]="loginForm" (ngSubmit)="loginUser()">
        <h2>Login</h2>
          <app-mat-input [formGroup]="loginForm" formControlName="username" placeholder="Username" ngDefaultControl></app-mat-input>
          <app-mat-input [formGroup]="loginForm" formControlName="password" placeholder="Password" ngDefaultControl></app-mat-input>
          <br />
          <button mat-flat-button type="submit" color="accent">Login</button>
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
