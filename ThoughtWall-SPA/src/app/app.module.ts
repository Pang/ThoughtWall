import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account-page/account.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommentComponent } from './home-page/thread-page/comment/comment.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginFormComponent } from './account/account-page/login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputComponent } from './form-controls/mat-input/mat-input.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTextareaComponent } from './form-controls/mat-textarea/mat-textarea.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilePageComponent } from './account/profile-page/profile-page.component';
import { RegisterFormComponent } from './account/account-page/register-form/register-form.component';
import { SearchPageComponent } from './home-page/search-page/search-page.component';
import { SubmitPageComponent } from './home-page/thread-page/submit-form/submit-form.component';
import { ThreadPageComponent } from './home-page/thread-page/thread-page.component';
import { ThreadService } from './_services/thread/thread.service';
import { ThreadSummaryComponent } from './home-page/thread-page/thread-summary/thread-summary.component';
import { TimeAgoPipe } from 'time-ago-pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'submit', component: SubmitPageComponent },
  { path: 'thread/:id', component: ThreadPageComponent },
  { path: 'search/:kw', component: SearchPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent }, //Rename this to accountComponent
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ThreadSummaryComponent,
    SubmitPageComponent,
    NavBarComponent,
    ThreadPageComponent,
    SearchPageComponent,
    CommentComponent,
    ProfilePageComponent,
    PageNotFoundComponent,
    RegisterFormComponent,
    LoginFormComponent,
    TimeAgoPipe,
    MatInputComponent,
    AccountComponent,
    MatTextareaComponent,
  ],
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
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
    })
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent]
})

export class AppModule { }
