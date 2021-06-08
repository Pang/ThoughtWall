import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account/account.service';

@Component({
  selector: 'app-nav-bar',
  template: `
    <mat-toolbar color="primary">
      <a id="title" [routerLink]="['']">
        <h1>ThoughtWall</h1>
      </a>

      <div class="links">
        <form (ngSubmit)="onSearchSubmit()" id="searchBar">
          <input [(ngModel)]="keyword" name="keyword" type="text" placeholder="Search" />
        </form>

        <button mat-icon-button color="accent" [matMenuTriggerFor]="accountMenu">
          <mat-icon>article</mat-icon>
        </button>
        <mat-menu #accountMenu="matMenu">
        <button mat-menu-item [routerLink]="['/']"><mat-icon>home</mat-icon><span>Home</span></button>
          <button *ngIf="loggedIn" mat-menu-item [routerLink]="['/profile/' + accountService.getUniqueName]"><mat-icon>person</mat-icon><span>Profile</span></button>
          <button *ngIf="!loggedIn" mat-menu-item [routerLink]="['/account']"><mat-icon>person_outline</mat-icon><span>Account</span></button>
          <button *ngIf="loggedIn" mat-menu-item [routerLink]="['/submit']"><mat-icon>create</mat-icon><span>Write Post</span></button>
          <!-- <button mat-menu-item>About</button>
          <button mat-menu-item>Settings</button> -->
          <button *ngIf="loggedIn" mat-menu-item (click)="logout()"><mat-icon>exit_to_app</mat-icon><span>Logout</span></button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    #title {
      cursor: pointer;
    }
    h1 {
        font-size: 30px;
        margin: 0 0 0 10px;
        display: inline-block;
        color: white;
        vertical-align: middle;
    }
    #searchBar {
        display: inline-block;
        margin-right: 4px;
        vertical-align: middle;
    }
    @media only screen and (max-width: 700px) {
        #searchBar {
            display: none;
        }
        h1 {
            font-size: 35px;
        }
        a + a {
            margin-left: 10px;
        }
    }
    .links {
        margin-left: auto;
        display: inline-block;
        vertical-align: middle;
    }
    input[type="text"] {
        flex-grow: 2;
        height: 25px;
        width: 300px;
        vertical-align: 75%;
        border-radius: 5px;
        border: rgb(182, 182, 182) 1px solid;
        padding: 5px;
        font-size: 16px;
        vertical-align: middle;
    }
  `]
})

export class NavBarComponent implements OnInit {
  keyword: string;

  constructor(private router: Router, private accountService: AccountService) {
  }

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
