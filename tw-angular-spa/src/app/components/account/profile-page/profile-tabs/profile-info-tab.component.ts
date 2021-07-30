import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelProfile } from '../../_models/ModelProfile';
import { EditProfileDialogComponent } from '../dialogs/edit-profile-dialog.component';

@Component({
    selector: 'app-profile-info-tab',
    template: `
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
                <span>{{ userProfileData?.dob | date: "dd/MM/yyyy" }}</span>
            </div>
        </div>`,
    styles: [`
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

export class ProfileInfoTabComponent {
    @Input() userProfileData: ModelProfile;

    constructor(
        private dialog: MatDialog,
    ) {}

    openEditDialog() {
        const dialogRef = this.dialog.open(EditProfileDialogComponent, { minWidth: '40vw', data: this.userProfileData });

        dialogRef.afterClosed().subscribe((result: ModelProfile) => {
            if (result != null) {
                this.userProfileData.bio = result.bio;
            }
        });
    }
}
