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
  styleUrls: ['./sign-up-in.component.css']
})
export class SignUpInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
