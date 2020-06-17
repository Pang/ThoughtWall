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
      box-shadow: 3px 3px 7px rgba(0,0,0,0.3) !important;
      -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.3) !important;
      vertical-align: middle;
      display: inline-block;
      margin: 70px 50px;
      width: 300px;
      padding: 40px 0;
    }
  `]
})
export class AccountPageComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
