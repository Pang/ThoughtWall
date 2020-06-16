import { Component, OnInit } from '@angular/core';

import { ThreadService } from 'src/app/_services/thread/thread.service';

@Component({
  selector: 'app-home-page',
  template: `
    <app-thread-summary [threads]="threads"></app-thread-summary>
  `,
  styleUrls: ['./home-page.component.css']
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
