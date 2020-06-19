import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  keyword: string;

  constructor(private router: Router, private accountService: AccountService) { }

  get loggedIn() {
    return this.accountService.isLoggedIn();
  }

  onSearchSubmit() {
    this.router.navigate(['/search', this.keyword]);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
