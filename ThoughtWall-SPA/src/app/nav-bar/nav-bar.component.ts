import { Component, OnInit } from '@angular/core';
import { LoggedInService } from '../services/logged-in.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  keyword: string;
  loggedIn: boolean;

  constructor(loggedInService: LoggedInService) {
    this.loggedIn = loggedInService.loggedIn();
   }

  ngOnInit() {
  }

}
