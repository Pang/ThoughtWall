import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ThreadService } from 'src/app/_services/thread.service';
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

  constructor(private threadService: ThreadService) {}

  ngOnInit() {
    this.threadService.getThreads().subscribe(res => this.threads = res);
  }
}
