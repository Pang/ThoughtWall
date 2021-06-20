import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ProfileService } from '../_services/profile.service';
import { ModelProfile } from 'app/components/account/_models/ModelProfile';
import { MatDialog } from '@angular/material/dialog';
import { BookingStatusDialogComponent } from './dialogs/booking-status-dialog.component';
import { FormGroup } from '@angular/forms';
import { BookingService } from '../_services/booking.service';
import { ModelBooking, ModelBookingCreate } from '../_models/ModelBooking';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  template: `
    <div *ngIf="userProfileData; else loadingSpinner">
      <mat-card>
        <h1>{{ userProfileData?.username | titlecase }}'s Profile</h1>
        <button mat-flat-button *ngIf="canEdit" color="{{bookingsEnabled ? 'accent' : 'warn'}}" (click)="openBookingStatusDialog()">Bookings {{ bookingsEnabled ? 'Open' : 'Closed'}}</button>
        </mat-card>

        <mat-card style="min-height: 40vh">
          <mat-tab-group style="height: 100% !important">
            <!-- PROFILE TAB -->
            <mat-tab label="Profile"><br />
              <app-profile-info-tab [userProfileData]="userProfileData"></app-profile-info-tab>
            </mat-tab>
            <!-- POSTS TAB -->
            <mat-tab label="Posts"><br/>
              <app-profile-posts-tab [userProfileData]="userProfileData"></app-profile-posts-tab>
            </mat-tab>
            <!-- BOOKINGS TAB -->
            <mat-tab label="Bookings"><br/>
              <app-profile-bookings-tab [userProfileData]="userProfileData" [isOwnProfile]="canEdit"></app-profile-bookings-tab>
            </mat-tab>
          </mat-tab-group>
        </mat-card>
    </div>

    <ng-template #loadingSpinner>
      <mat-spinner color="accent"></mat-spinner>
    </ng-template>
  `,
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

  openBookingStatusDialog() {
    const dialogRef = this.dialog.open(BookingStatusDialogComponent, { minWidth: '20vw', data: this.userProfileData });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result != null) {
        this.userProfileData.bookingsEnabled = result;
      }
    });
  }
}
