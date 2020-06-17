import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-in',
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
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
