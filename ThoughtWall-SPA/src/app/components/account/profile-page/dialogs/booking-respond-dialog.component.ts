import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelBooking } from '../../_models/ModelBooking';
import { BookingService } from '../../_services/booking.service';
import { ProfileService } from '../../_services/profile.service';

@Component({
    selector: 'app-profile-page',
    template: `
        <div style="text-align: center">
            <h2>Respond to booking request</h2>
            <button mat-flat-button color="accent" (click)="acceptRequest()">Accept</button>
            <button mat-flat-button color="warn" (click)="declineRequest()">Decline</button>
        </div>
    `,
    styles: [`
        .mat-flat-button {
            margin: 10px;
        }
    `],
})
export class BookingRespondDialogComponent {
    bookingData: ModelBooking;
    profileForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ModelBooking,
        private dialogRef: MatDialogRef<BookingRespondDialogComponent>,
        private bookingService: BookingService,
    ) {
        this.bookingData = data;
    }

    acceptRequest() {
        console.log(this.bookingData);
        this.bookingService.acceptBooking(this.bookingData.id).subscribe(() => {
            console.log('Accept Success!');
            this.dialogRef.close();
        });
    }

    declineRequest() {
        this.bookingService.declineBooking(this.bookingData.id).subscribe(() => {
            console.log('Decline Success!');
            this.dialogRef.close();
        });
    }
}
