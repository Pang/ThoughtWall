import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from 'app/components/account/profile-page/profile-page.component';
import { ModelProfile } from 'app/_models/ModelProfile';
import { ProfileService } from 'app/_services/account/profile.service';
import { Observable, of } from 'rxjs';

describe('Component: ProfilePage', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilePageComponent],
            imports: [RouterModule.forRoot([]), HttpClientTestingModule, MatDialogModule],
            providers: [MatDialog],
        });
    });

    it('should fill profile page details', fakeAsync(() => {
        const fixture = TestBed.createComponent(ProfilePageComponent);
        const app = fixture.debugElement.componentInstance;
        const profileService = fixture.debugElement.injector.get(ProfileService);
        const testProfile: Observable<ModelProfile> = of({ id: 2, username: 'pang' });
        spyOn(profileService, 'getProfileData').and.returnValue(testProfile);
        fixture.detectChanges();
        tick();
        expect(app.userProfileData).toBeTruthy();
    }));
});
