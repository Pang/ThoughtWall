import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from 'app/components/account/profile-page/profile-page.component';
import { ModelProfile } from 'app/components/account/_models/ModelProfile';
import { ProfileService } from 'app/components/account/_services/profile.service';
import { Observable, of } from 'rxjs';

describe('Component: ProfilePage', () => {
    let fixture: ComponentFixture<ProfilePageComponent>;
    let app: any;
    let profileService: ProfileService;
    const testProfile: Observable<ModelProfile> = of({ id: 2, username: 'pang', bookingsEnabled: true });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilePageComponent],
            imports: [RouterModule.forRoot([]), HttpClientTestingModule, MatDialogModule],
            providers: [{ MatDialog, useValue: {} }],
        });
        fixture = TestBed.createComponent(ProfilePageComponent);
        app = fixture.debugElement.componentInstance;
        profileService = fixture.debugElement.injector.get(ProfileService);
    });

    it('should fill profile page details', fakeAsync(() => {
        spyOn(profileService, 'getProfileData').and.returnValue(testProfile);
        fixture.detectChanges();
        tick();
        expect(app.userProfileData).toBeTruthy();
    }));
});
