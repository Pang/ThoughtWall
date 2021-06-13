import { Component, OnInit } from '@angular/core';
import { ThreadService } from './_services/thread.service';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="container"><br/>
      <app-thread-summary *ngFor="let thread of threads" [thread]="thread"></app-thread-summary>
    </div>
  `,
  styles: [`
    .container {
      width: 100%;
      text-align: center;
    }
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
      },
      err => console.log('err'));
  }
}
