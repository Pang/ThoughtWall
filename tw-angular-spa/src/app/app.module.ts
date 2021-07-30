import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { metaReducers, reducers } from './_reducers';

import { AccountPageComponent } from './components/account/account-page/account-page.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommentComponent } from './components/home-page/thread-page/comment/comment.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginFormComponent } from './components/account/account-page/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './components/account/profile-page/profile-page.component';
import { RegisterFormComponent } from './components/account/account-page/register-form/register-form.component';
import { SearchPageComponent } from './components/home-page/search-page/search-page.component';
import { StoreModule } from '@ngrx/store';
import { SubmitPageComponent } from './components/home-page/thread-page/submit-form/submit-form.component';
import { ThreadPageComponent } from './components/home-page/thread-page/thread-page.component';
import { ThreadSummaryComponent } from './components/home-page/thread-page/thread-summary/thread-summary.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { EditProfileDialogComponent } from './components/account/profile-page/dialogs/edit-profile-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from './components/shared-misc/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/shared-misc/page-not-found/page-not-found.component';
import { ThreadService } from './components/home-page/_services/thread.service';
import { MatInputComponent } from './components/shared-misc/form-controls/mat-input/mat-input.component';
import { MatTextareaComponent } from './components/shared-misc/form-controls/mat-textarea/mat-textarea.component';
import { BookingStatusDialogComponent } from './components/account/profile-page/dialogs/booking-status-dialog.component';
import { MaterialModule } from './material.module';
import { ProfileInfoTabComponent } from './components/account/profile-page/profile-tabs/profile-info-tab.component';
import { ProfilePostsTabComponent } from './components/account/profile-page/profile-tabs/profile-posts-tab.component';
import { ProfileBookingsTabComponent } from './components/account/profile-page/profile-tabs/profile-bookings-tab.component';
import { BookingRespondDialogComponent } from './components/account/profile-page/dialogs/booking-respond-dialog.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'submit', component: SubmitPageComponent },
  { path: 'thread/:id', component: ThreadPageComponent },
  { path: 'search/:kw', component: SearchPageComponent },
  { path: 'profile/:user', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountPageComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BookingStatusDialogComponent,
    HomePageComponent,
    ThreadSummaryComponent,
    SubmitPageComponent,
    NavBarComponent,
    ThreadPageComponent,
    SearchPageComponent,
    CommentComponent,
    ProfilePageComponent,
    ProfileInfoTabComponent,
    ProfilePostsTabComponent,
    ProfileBookingsTabComponent,
    BookingRespondDialogComponent,
    EditProfileDialogComponent,
    PageNotFoundComponent,
    RegisterFormComponent,
    LoginFormComponent,
    TimeAgoPipe,
    MatInputComponent,
    MatTextareaComponent,
    AccountPageComponent,
  ],
  imports: [
    // HttpClientTestingModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  exports: [
    RegisterFormComponent,
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent]
})

export class AppModule { }
