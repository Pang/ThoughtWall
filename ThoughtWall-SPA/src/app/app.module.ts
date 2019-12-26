import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ThreadComponent } from './home-page/thread/thread.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ThreadPageComponent } from './thread-page/thread-page.component';
import { HttpApiService } from './_services/http-api.service';
import { SearchPageComponent } from './search-page/search-page.component';
import { CommentComponent } from './thread-page/comment/comment.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './_guards/auth.guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const appRoutes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'submit', component: SubmitPageComponent },
  { path: 'thread/:id', component: ThreadPageComponent },
  { path: 'search/:kw', component: SearchPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ThreadComponent,
    SubmitPageComponent,
    NavBarComponent,
    ThreadPageComponent,
    SearchPageComponent,
    CommentComponent,
    ProfilePageComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
  providers: [HttpApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
