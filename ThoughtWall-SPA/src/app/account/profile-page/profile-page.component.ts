import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../_services/account/account.service';
import { ProfileService } from 'app/_services/account/profile.service';
import { ModelProfile } from 'app/_models/ModelProfile';

@Component({
  selector: 'app-profile-page',
  template: `
    <div>
      <mat-card>
        <h1>{{ userProfileData?.username | titlecase }}'s Profile</h1>
      </mat-card>

      <mat-card>
        <div>
          <h4><u>Bio</u></h4>
          <p>{{ userProfileData?.bio }}</p>
        </div>
        <div class="flexContainer">
          <div class="flexItem">
            <h4><u>Country</u></h4>
            <p>{{ userProfileData?.country }}</p>
          </div>
          <div class="flexItem">
            <h4><u>DoB</u></h4>
            <p>{{ userProfileData?.dob }}</p>
          </div>
        </div>
      </mat-card>

      <mat-card class="flexContainer">
        <div class="flexItem">
          <h4><u>Threads</u></h4>
          <ul>
            <li *ngFor="let thread of userProfileData?.threads"><b class="threadLink"
                [routerLink]="['/thread', thread.id]">{{ thread.title }}</b>
              ({{ thread.timeStamp | date: "dd/MM/yyyy" }})</li>
          </ul>
        </div>

        <div class="flexItem">
          <h4><u>Comments</u></h4>
          <ul>
            <li *ngFor="let comment of userProfileData?.comments">
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
  userProfileData: ModelProfile;

  constructor(
    private accountService: AccountService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {
      this.getData();
  }

  getData() {
    const routeUser = this.route.snapshot.paramMap.get('user');
    this.profileService.getProfileData(routeUser).subscribe((data) => {
      this.userProfileData = data;
    });
  }
}
