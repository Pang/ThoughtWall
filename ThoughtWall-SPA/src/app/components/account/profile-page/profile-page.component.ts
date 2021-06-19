import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ProfileService } from '../_services/profile.service';
import { ModelProfile } from 'app/components/account/_models/ModelProfile';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from './edit-profile-dialog.component';
import { BookingStatusDialogComponent } from './booking-status-dialog.component';

@Component({
  selector: 'app-profile-page',
  template: `
    <div *ngIf="userProfileData; else loadingSpinner">
      <mat-card>
        <h1>{{ userProfileData?.username | titlecase }}'s Profile</h1>
        <button mat-flat-button color="{{bookingsEnabled ? 'accent' : 'warn'}}" (click)="openBookingStatusDialog()">Bookings {{ bookingsEnabled ? 'Open' : 'Closed'}}</button>
        </mat-card>

        <mat-card style="min-height: 40vh">
          <mat-tab-group>
            <!-- PROFILE TAB -->
            <mat-tab label="Profile"><br />
              <button mat-icon-button *ngIf="canEdit" (click)="openEditDialog()" style="float: right;" color="accent">
                <mat-icon aria-hidden="false">edit</mat-icon>
              </button>
              <div>
                <h4 color="accent">Bio</h4>
                <span>{{ userProfileData?.bio }}</span>
              </div><br />
              <div class="flexContainer">
                <div class="flexItem">
                  <h4>Country</h4>
                  <span>{{ userProfileData?.country }}</span>
                </div>
                <div class="flexItem">
                  <h4>DoB</h4>
                  <span>{{ userProfileData?.dob }}</span>
                </div>
              </div>
            </mat-tab>
            <!-- THREADS TAB -->
            <mat-tab label="Threads"><br/>
              <div class="flexContainer">
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
              </div>
            </mat-tab>
            <!-- THREADS TAB -->
            <mat-tab label="Bookings"> Content 3 </mat-tab>
          </mat-tab-group>
        </mat-card>
    </div>

    <ng-template #loadingSpinner>
      <mat-spinner color="accent"></mat-spinner>
    </ng-template>

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
    h4 {
      margin-top: 0px;
      margin-bottom: 5px;
    }
  `],
})

export class ProfilePageComponent implements OnInit {
  userProfileData: ModelProfile;
  routeProfile: string;

  get canEdit() {
    return this.accountService.getUniqueName === this.routeProfile;
  }
  get bookingsEnabled() {
    return this.userProfileData.bookingsEnabled;
  }

  constructor(
    private accountService: AccountService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.routeProfile = this.route.snapshot.paramMap.get('user');
    this.profileService.getProfileData(this.routeProfile).subscribe((data) => {
      this.userProfileData = data;
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, { minWidth: '40vw', data: this.userProfileData });

    dialogRef.afterClosed().subscribe((result: ModelProfile) => {
      if (result != null) {
        this.userProfileData.bio = result.bio;
      }
    });
  }

  openBookingStatusDialog() {
    const dialogRef = this.dialog.open(BookingStatusDialogComponent, { minWidth: '20vw', data: this.userProfileData });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result != null) {
        this.userProfileData.bookingsEnabled = result;
      }
    });
  }
}
