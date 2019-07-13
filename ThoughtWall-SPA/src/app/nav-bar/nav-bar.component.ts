import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  keyword: string;

  constructor() {}

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  ngOnInit() {
  }

}
