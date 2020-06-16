import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/_services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  template: `
    <form class="dataForm" [formGroup]="registerForm" (ngSubmit)="registerUser()">
      <h2><i>Register</i></h2>
      <input formControlName="username" type="text" autocomplete="off" placeholder="Username"><br>
      <input formControlName="password" type="password" autocomplete="off" placeholder="Password"><br>
      <input formControlName="passwordMatch" type="password" autocomplete="off" placeholder="Retype Password">
      <div style="color: white" [hidden]="registerForm.get('username').valid || registerForm.get('username').pristine">
        Username needs to be between 3 - 12 characters
      </div>
      <div style="color: white" [hidden]="registerForm.get('password').valid || registerForm.get('password').pristine">
        Password needs to be between 6 - 20 characters
      </div>
      <div *ngIf="isError">
        {{ errorMsg }}
      </div>
      <button type="submit">Submit</button>
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
