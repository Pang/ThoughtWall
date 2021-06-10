import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelProfile } from 'app/components/account/_models/ModelProfile';
import { ProfileService } from '../_services/profile.service';

@Component({
    selector: 'app-profile-page',
    template: `
        <h2>Edit Bio</h2>
        <form [formGroup]="profileForm" (ngSubmit)="updateProfile()">
            <app-mat-textarea [formGroup]="profileForm" formControlName="bio" placeholder="Write about yourself!" ngDefaultControl></app-mat-textarea>
            <button mat-flat-button color="accent" type="submit">Submit</button>
        </form>
    `,
})
export class EditProfileDialogComponent implements OnInit {
    profileData: ModelProfile;
    profileForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ModelProfile,
        private dialogRef: MatDialogRef<EditProfileDialogComponent>,
        private profileService: ProfileService
    ) {
        this.profileData = data;
    }

    ngOnInit() {
        this.profileForm = this.profileService.createForm(this.profileData);
    }

    updateProfile() {
        this.profileService.updateProfile(this.profileForm.value).subscribe((data) => {
            this.dialogRef.close(data);
        },
        () => console.error(`Couldn't update profile`));
    }
}
