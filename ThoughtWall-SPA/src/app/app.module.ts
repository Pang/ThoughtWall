import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ThreadComponent } from './home-page/thread/thread.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ThreadComponent,
    SubmitPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
