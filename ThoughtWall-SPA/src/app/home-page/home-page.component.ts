import { Component } from '@angular/core';
import { HttpApiService } from 'src/app/_services/http-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  threads = [];
  pageNo: number;

  constructor(private httpApi: HttpApiService, private route: ActivatedRoute, private router: Router) {
    this.pageNo = parseInt(this.route.snapshot.paramMap.get('pn'));

    this.httpApi.getThreads(this.pageNo)
      .subscribe(res => this.threads = res);
  }

  clickBtn() {
    this.httpApi.getOldThreads(this.threads.length)
      .subscribe(res => this.threads.concat(res));
  }

  threadsNext() {
    if(this.threads.length >= 5) {
      return true;
    } else {
      return false;
    }
  }

  prevPage() {
    this.pageNo = this.pageNo - 1;
    this.router.navigate(['page/' + this.pageNo]);
    this.httpApi.getThreads(this.pageNo)
      .subscribe(res => this.threads = res);
  }

  nextPage() {
    this.pageNo = this.pageNo + 1;
    this.router.navigate(['page/' + this.pageNo]);
    this.httpApi.getThreads(this.pageNo)
      .subscribe(res => this.threads = res);
  }
}
