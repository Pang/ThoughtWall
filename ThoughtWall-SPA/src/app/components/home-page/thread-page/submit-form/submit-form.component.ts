import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThreadService } from '../../_services/thread.service';

@Component({
  selector: 'app-submit-form',
  template: `
    <mat-card class="shadow">
    <form [formGroup]="threadPostForm" (ngSubmit)="onSubmit()">
      <h2>Share your thoughts!</h2>
      <app-mat-input [formGroup]="threadPostForm" formControlName="title" placeholder="Title" ngDefaultControl></app-mat-input>
      <app-mat-textarea [formGroup]="threadPostForm" formControlName="body" placeholder="What are your thoughts?"
            ngDefaultControl>
          </app-mat-textarea>
      <div *ngIf="threadPostForm.get('title').invalid && threadPostForm.get('title').dirty">Title needs to be between 2-40 characters</div>
      <div *ngIf="threadPostForm.get('body').invalid && threadPostForm.get('body').dirty">Body needs to be between 10-400 characters</div>
      <div align="right">
        <button mat-flat-button color="accent" type="button" (click)="onSubmit()">Submit</button>
      </div>
    </form>
  </mat-card>
  `,
  styles: [`
      #threadForm {
        background-color: rgb(32, 35, 46);
        color: white;
        text-align: center;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        width: 650px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px 0 40px 0;
        border-radius: 10px;
        position: relative;
        top: 50px;
        -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
        box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
    }
    mat-card {
        text-align: center;
        margin-top: 50px;
        max-width: 600px;
    }
    .shadow {
        -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
        box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
    }
    .app-mat-input {
        width: 900px;
    }
  `]
})

export class SubmitPageComponent {
  threadPostForm: FormGroup;

  constructor(private threadService: ThreadService, private router: Router) {
    this.threadPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      body: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(400)]),
    })
  }

  onSubmit() {
    this.threadService.postThread(this.threadPostForm.value).subscribe(
      () => {
        this.threadService.redirectTo(this.threadPostForm.get('title').value).subscribe(
          res => this.router.navigate([`/thread/${res}`]));
      },
      fail => {
        if (fail.status === 401) {
          console.log("401");
        } else {
          console.log(fail);
        }
      }
    );
  }
}
