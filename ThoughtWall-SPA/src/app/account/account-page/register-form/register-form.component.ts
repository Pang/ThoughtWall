import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/_services/account/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  template: `
        <form class="dataForm" [formGroup]="registerForm" (ngSubmit)="registerUser()">
          <h2><i>Register</i></h2>
          <app-mat-input [formGroup]="registerForm" formControlName="username" placeholder="Username" ngDefaultControl></app-mat-input>
          <app-mat-input [formGroup]="registerForm" formControlName="password" placeholder="Password" ngDefaultControl></app-mat-input>
          <app-mat-input [formGroup]="registerForm" formControlName="passwordMatch" placeholder="Retype Password" ngDefaultControl></app-mat-input>
          <app-mat-input [formGroup]="registerForm" formControlName="email" placeholder="Email Address" ngDefaultControl></app-mat-input>

          <div style="color: white" [hidden]="registerForm.get('username').valid || registerForm.get('username').pristine">
            Username needs to be between 3 - 12 characters
          </div>
          <div style="color: white" [hidden]="registerForm.get('password').valid || registerForm.get('password').pristine">
            Password needs to be between 6 - 20 characters
          </div>
          <div *ngIf="isError">
            {{ errorMsg }}
          </div>
          <button mat-flat-button type="submit" color="accent">Register</button>
        </form>
  `,
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  isError: boolean;
  errorMsg: string;
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.registerService.createForm();
  }

  registerUser() {
    this.registerService.post(this.registerForm.value).subscribe(
      () => this.router.navigate(['/']),
      () => {
        this.isError = true;
        this.errorMsg = 'Unable to register';
      }
    );
  }
}
