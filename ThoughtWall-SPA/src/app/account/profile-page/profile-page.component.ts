import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account/account.service';

@Component({
  selector: 'app-profile-page',
  template: `
    <div>
      <mat-card>
        <h1>{{ uniqueName | titlecase }}'s Profile</h1>
      </mat-card>
      <mat-card class="flexContainer">
        <div class="flexItem">
          <h4><u>Threads</u></h4>
          <ul>
            <li *ngFor="let thread of usersThreads"><b class="threadLink"
                [routerLink]="['/thread', thread.id]">{{ thread.title }}</b>
              ({{ thread.timeStamp | date: "dd/MM/yyyy" }})</li>
          </ul>
        </div>

        <div class="flexItem">
          <h4><u>Comments</u></h4>
          <ul>
            <li *ngFor="let comment of usersComments">
              <b class="threadLink" [routerLink]="['/thread', comment.threadId]">[{{ comment.threadId }}]</b>&nbsp;
              <i>"{{ comment.body }}"</i> ({{ comment.timeStamp | date: "dd/MM/yyyy" }})</li>
          </ul>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .threadLink:hover {
      cursor: pointer;
      color: rgb(119, 210, 235);
    }
    mat-card {
        margin-top: 10px;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
        box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
    }
    .flexContainer {
        max-width: 1000px;
        display: flex;
        margin: 10px auto;
    }
    .flexItem {
        flex-grow: 1;
        justify-content: center;
        align-items: flex-start;
    }
  `]
})

export class ProfilePageComponent {
  usersThreads = [];
  usersComments = [];

  get uniqueName() {
    return this.accountService.getUniqueName;
  }
  
  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.getUsersThreads(this.accountService.getUserId)
      .subscribe(
        data => this.usersThreads = data
      );
    this.accountService.getUsersComments(this.accountService.getUserId)
      .subscribe(
        data => this.usersComments = data
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
