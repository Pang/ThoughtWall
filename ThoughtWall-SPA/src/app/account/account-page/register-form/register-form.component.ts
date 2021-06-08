import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '../../../_services/account/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  template: `
        <form [formGroup]="registerForm" (ngSubmit)="registerUser()">
          <h2><i>Register</i></h2>
          <app-mat-input [formGroup]="registerForm" formControlName="username" placeholder="Username" ngDefaultControl></app-mat-input>
          <app-mat-input [formGroup]="registerForm" formControlName="password" type="password" placeholder="Password" ngDefaultControl></app-mat-input>
          <app-mat-input [formGroup]="registerForm" formControlName="passwordMatch" type="password" placeholder="Retype Password" ngDefaultControl></app-mat-input>
          <app-mat-input [formGroup]="registerForm" formControlName="emailAddress" placeholder="Email Address" ngDefaultControl></app-mat-input>
          <p style="color: white" [hidden]="registerForm.get('username').valid || registerForm.get('username').pristine">
            Username needs to be between 3 - 12 characters
          </p>
          <p style="color: white" [hidden]="registerForm.get('password').valid || registerForm.get('password').pristine">
            Password needs to be between 6 - 20 characters
          </p>
          <p *ngIf="isError">
            {{ errorMsg }}
          </p>
          <button mat-flat-button type="submit" color="accent">Register</button>
        </form>
  `,
  styles: [`
    p {
      margin-top:0px;
      font-size: 12px;
    }`
  ]
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  isError: boolean;
  errorMsg: string;
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.registerService.createForm();
  }

  checkPasswords() { // here we have the 'passwords' group
    const pass = this.registerForm.get('password').value;
    const passwordMatch = this.registerForm.get('passwordMatch').value;
    return pass === passwordMatch ? true : false;
  }

  registerUser() {
    console.log(this.registerForm.value)
    if (this.checkPasswords()) {
      this.registerService.post(this.registerForm).subscribe(
        () => this.router.navigate(['/']),
        () => {
          this.isError = true;
          this.errorMsg = 'Unable to register';
        }
      );
    } else {
      this.isError = true;
      this.errorMsg = 'Passwords do not match';
    }
  }
}
