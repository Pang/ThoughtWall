import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() {}
  title = 'ThoughtWall';
  helper = new JwtHelperService();

  ngOnInit() {
    if (!this.helper.isTokenExpired()) {
      localStorage.removeItem('token');
    }
  }
}
