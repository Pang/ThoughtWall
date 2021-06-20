import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModelBooking, ModelBookingCreate } from '../../_models/ModelBooking';
import { ModelProfile } from '../../_models/ModelProfile';
import { BookingService } from '../../_services/booking.service';
import { BookingRespondDialogComponent } from '../dialogs/booking-respond-dialog.component';

@Component({
    selector: 'app-profile-bookings-tab',
    template: `
        <div *ngIf="isOwnProfile; else bookingForm">
            <table *ngIf="allBookings | async as bookings" mat-table [dataSource]="bookings" class="mat-elevation-z8">
                <!-- Position Column -->
                <ng-container matColumnDef="sentBy">
                    <th mat-header-cell *matHeaderCellDef>Requested By</th>
                    <td mat-cell *matCellDef="let element">{{ element?.bookingOwner?.username | titlecase }}</td>
                </ng-container>

                <ng-container matColumnDef="sentTo">
                    <th mat-header-cell *matHeaderCellDef>Sent to</th>
                    <td mat-cell *matCellDef="let element">{{ element?.bookedWithUser?.username | titlecase }}</td>
                </ng-container>

                <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef>Meeting Date</th>
                    <td mat-cell *matCellDef="let element">{{ element?.requestedDT | date:'medium' }}</td>
                </ng-container>

                <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Booking Status</th>
                    <td mat-cell *matCellDef="let element">
                        <mat-chip-list #chipList aria-label="Fruit selection">
                            <mat-chip [color]="colorPending(element.statusId)" selected>{{ element?.status.status }}</mat-chip>
                        </mat-chip-list>
                    </td>
                </ng-container>

                <ng-container matColumnDef="respond">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let element" class="matBtnCol">
                        <button [disabled]="element?.statusId != 1 || element?.bookingOwnerId == userProfileData.id"
                            mat-flat-button color="accent" (click)="openRespondDialog(element)">
                            {{ element?.bookingOwnerId != userProfileData.id ? "Respond" : element?.statusId == 1 ? "Awaiting Response" : "Response Received" }}
                        </button>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
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
        styles: [`
            table {
                width: 100%;
            }
            h4 {
                margin-top: 0px;
                margin-bottom: 5px;
            }
            .matBtnCol {
                display: flex;
                padding: 10px 0;
                justify-content: flex-end;
            }
        `]
})

export class ProfileBookingsTabComponent implements OnInit {
    @Input() userProfileData: ModelProfile;
    @Input() isOwnProfile: boolean;
    form: FormGroup;
    allBookings: Observable<ModelBooking[]>;

    displayedColumns: string[] = ['sentBy', 'sentTo', 'date', 'status', 'respond'];

    colorPending(statusId: number) {
        switch (statusId) {
            case 1:
                return 'primary';
            case 2:
                return 'undefined';
            case 3:
                return 'warn';
            default:
                return 'primary';
        }
    }

    constructor(
        private bookingService: BookingService,
        private dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.form = this.bookingService.createForm();
        this.allBookings = this.bookingService.getAllBookings();
    }

    openRespondDialog(element: ModelBooking) {
        const dialogRef = this.dialog.open(BookingRespondDialogComponent, { minWidth: '20vw', data: element });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result != null) {
                this.userProfileData.bookingsEnabled = result;
            }
        });
    }

    bookMeeting() {
        const newDateFormat = new Date(this.form.value.date)
          .setHours(this.form.value.time.slice(0, 2), this.form.value.time.slice(3, 5));

        const reqForm: ModelBookingCreate = {
          bookedWithUserId: this.userProfileData.id,
          requestedDT: new Date(newDateFormat),
        };

        this.bookingService.createBooking(reqForm).subscribe(() => {
          console.log('Booked!');
        });
    }
}
