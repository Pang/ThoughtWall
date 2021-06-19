import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelProfile } from 'app/components/account/_models/ModelProfile';
import { ProfileService } from '../_services/profile.service';

@Component({
    selector: 'app-profile-page',
    template: `
        <div style="text-align: center">
            <h2>{{ profileData.bookingsEnabled ? 'Close' : 'Open' }} bookings?</h2>
            <button mat-flat-button color="accent" type="submit" (click)="updateBookingStatus()">{{ profileData.bookingsEnabled ? 'Close' : 'Open' }} bookings</button>
            <button mat-flat-button color="warn" type="submit" [mat-dialog-close]>Cancel</button>
        </div>
    `,
    styles: [`
        .mat-flat-button {
            margin: 10px;
        }
    `],
})
export class BookingStatusDialogComponent implements OnInit {
    profileData: ModelProfile;
    profileForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ModelProfile,
        private dialogRef: MatDialogRef<BookingStatusDialogComponent>,
        private profileService: ProfileService
    ) {
        this.profileData = data;
    }

    ngOnInit() {
        this.profileForm = this.profileService.createForm(this.profileData);
    }

    updateBookingStatus() {
        this.profileService.changeBookingEnabled(this.profileData).subscribe(
            (data: boolean) => this.dialogRef.close(data));
    }
}
