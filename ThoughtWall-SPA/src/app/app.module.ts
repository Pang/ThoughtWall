import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ThreadComponent } from './home-page/thread/thread.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DataService } from './services/data.service';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'submit', component: SubmitPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ThreadComponent,
    SubmitPageComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})



export class AppModule { }
