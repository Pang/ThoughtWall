import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommentComponent } from './thread-page/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { ThreadService } from './_services/thread.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { ThreadSummaryComponent } from './home-page/thread-summary/thread-summary.component';
import { ThreadPageComponent } from './thread-page/thread-page.component';
import { RegisterFormComponent } from './nav-bar/register-form/register-form.component';
import { LoginFormComponent } from './nav-bar/login-form/login-form.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'submit', component: SubmitPageComponent },
  { path: 'thread/:id', component: ThreadPageComponent },
  { path: 'search/:kw', component: SearchPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  // { path: 'register', component: null },
  // { path: 'login', component: null },
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
