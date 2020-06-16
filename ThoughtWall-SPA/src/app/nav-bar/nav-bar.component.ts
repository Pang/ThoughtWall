import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  keyword: string;

  constructor(private router: Router) { }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  onSearchSubmit() {
    this.router.navigate(['/search', this.keyword]);
  }
  ngOnInit() {
  }

}
