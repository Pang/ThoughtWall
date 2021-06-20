import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModelBooking, ModelBookingCreate } from '../../_models/ModelBooking';
import { ModelProfile } from '../../_models/ModelProfile';
import { BookingService } from '../../_services/booking.service';

@Component({
    selector: 'app-profile-bookings-tab',
    template: `
        <div *ngIf="isOwnProfile; else bookingForm">
            <div *ngIf="allBookings | async as bookings">
            Bookings:
            <p *ngFor="let created of bookings.created">
                Booking with {{ created.bookedWithUser.username | titlecase }} on {{ created.requestedDT | date:'medium'}}
            </p>
            </div>
        </div>

        <!-- Booking Form -->
        <ng-template #bookingForm>
            <p>Please select your preferred date and time</p>
            <form [formGroup]="form" (submit)="bookMeeting()">
                <mat-form-field color="accent" appearance="fill">
                    <mat-label>Choose a date</mat-label>
                    <input matInput formControlName="date" [matDatepicker]="picker">
                    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker [dateClass]="dateClass" #picker></mat-datepicker>
                </mat-form-field> &nbsp;&nbsp;&nbsp;
                <mat-form-field color="accent">
                    <mat-label>Time</mat-label>
                    <input matInput formControlName="time" type="time" id="appt" name="appt" min="09:00" max="18:00" required>
                </mat-form-field><br/>
                <button mat-flat-button type="submit" color="accent">Submit</button>
            </form>
        </ng-template>`,
})

export class ProfileBookingsTabComponent implements OnInit {
    @Input() userProfileData: ModelProfile;
    @Input() isOwnProfile: boolean;
    form: FormGroup;
    allBookings: Observable<ModelBooking[]>;

    constructor(
        private bookingService: BookingService,
      ) {}

    ngOnInit() {
        this.form = this.bookingService.createForm();
        this.allBookings = this.bookingService.getAllBookings();
    }

    bookMeeting() {
        console.log(this.form.value.date);
        const newDateFormat = new Date(this.form.value.date)
          .setHours(this.form.value.time.slice(0, 2), this.form.value.time.slice(3, 5));

        console.log(new Date(newDateFormat));

        const reqForm: ModelBookingCreate = {
          bookedWithUserId: this.userProfileData.id,
          requestedDT: new Date(newDateFormat),
        };

        this.bookingService.createBooking(reqForm).subscribe(() => {
          console.log('Booked!');
        });
      }
}
