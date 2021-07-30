import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-page',
  template: `
    <div>
      <mat-card>
        <app-register-form></app-register-form>
      </mat-card>
      <mat-card>
        <app-login-form></app-login-form>
      </mat-card>
    </div>
  `,
  styles: [`
    div {
      margin: 70px auto;
      text-align: center;
    }
    mat-card {
      vertical-align: middle;
      display: inline-block;
      margin: 70px 50px;
      width: 300px;
      padding: 40px 0;
    }
  `]
})
export class AccountPageComponent {
  constructor() {}
}
