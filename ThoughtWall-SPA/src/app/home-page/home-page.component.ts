import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpApiService } from 'src/app/_services/http-api.service';
import { NavbarService } from '../_services/navbar.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  threads = [];
  pageNo: number;
  subscription: Subscription;

  constructor(private httpApi: HttpApiService,
    private route: ActivatedRoute,
    private router: Router,
    private navbarService: NavbarService) {
    this.pageNo = parseInt(this.route.snapshot.paramMap.get('pn'));
    this.httpApi.getThreads(this.pageNo)
      .subscribe(res => this.threads = res);
  }

  ngOnInit() {
    this.subscription = this.navbarService.navItem$
      .subscribe(item => {
        this.pageNo = 1;
        this.getPageThreads(item);
      });
  }

  threadsNext() {
    if (this.threads.length >= 5) {
      return true;
    } else {
      return false;
    }
  }

  getPageThreads(item) {
    this.router.navigate(['page/' + this.pageNo]);
    this.httpApi.getThreads(item)
      .subscribe(res => this.threads = res);
  }

  prevPage() {
    this.pageNo = this.pageNo - 1;
    this.getPageThreads(this.pageNo);
  }

  nextPage() {
    this.pageNo = this.pageNo + 1;
    this.getPageThreads(this.pageNo);
  }
}
