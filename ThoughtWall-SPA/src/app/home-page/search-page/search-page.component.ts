import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from 'src/app/_services/thread/thread.service';

@Component({
  selector: 'app-search-page',
  template: `
    <app-thread-summary [threads]="threads"></app-thread-summary>
  `,
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  threads = [];

  constructor(private route: ActivatedRoute, private threadService: ThreadService) {
    const keyword = this.route.snapshot.paramMap.get('kw');
    this.threadService.getSearch(keyword)
      .subscribe(res => this.threads = res);
  }

  ngOnInit() {
  }


}
