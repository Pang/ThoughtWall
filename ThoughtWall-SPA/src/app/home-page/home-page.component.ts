import { Component, OnInit } from '@angular/core';

import { ThreadService } from '../_services/thread/thread.service';

@Component({
  selector: 'app-home-page',
  template: `
    <app-thread-summary [threads]="threads"></app-thread-summary>
  `,
  styles: [`
    form {
      text-align: center;
    }
    .arrow {
        cursor: pointer;
    }
    .arrow:hover {
        color: rgb(119, 210, 235);
    }
    #pageNo {
        font-size: 40px;
        color: white;
        cursor: default;
    }
  `]
})

export class HomePageComponent implements OnInit {
  threads = [];

  constructor(private threadService: ThreadService) {}

  ngOnInit() {
    this.threadService.getThreads().subscribe(res => {
      this.threads = res;
    });
  }
}
