import { Component, OnInit } from '@angular/core';
import { HttpApiService } from '../services/http-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  threads = [];

  constructor(private route: ActivatedRoute, private httpApi: HttpApiService) {
    const keyword = this.route.snapshot.paramMap.get('kw');
    this.httpApi.getSearchedThreads(keyword)
      .subscribe(res => this.threads = res);
  }

  ngOnInit() {
  }


}
