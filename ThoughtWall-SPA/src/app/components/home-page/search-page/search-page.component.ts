import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from '../_services/thread.service';

@Component({
  selector: 'app-search-page',
  template: `
    <div class="container"><br/>
      <h2>Search results:</h2>
      <div *ngIf="threads.length > 0; else noThreads">
        <app-thread-summary class="ngThreads" *ngFor="let thread of threads" [thread]="thread"></app-thread-summary>
      </div>
      <ng-template #noThreads>
        No threads were found.
      </ng-template>
    </div>
  `,
    styles: [`
      .container {
        width: 100%;
        text-align: center;
      }
    `]
})

export class SearchPageComponent implements OnInit {
  threads = [];

  constructor(private route: ActivatedRoute, private threadService: ThreadService) {}

  ngOnInit() {
    const keyword = this.route.snapshot.paramMap.get('kw');
    this.threadService.getSearch(keyword).subscribe(res => this.threads = res);
  }
}
