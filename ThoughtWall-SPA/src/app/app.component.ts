import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private jwtHelper: JwtHelperService){}
  title = 'ThoughtWall-SPA';
  helper = new JwtHelperService();

  ngOnInit() {
    console.log(this.jwtHelper.getTokenExpirationDate());
    if (!this.helper.isTokenExpired()) {
      localStorage.removeItem('token');
    }
  }
}
