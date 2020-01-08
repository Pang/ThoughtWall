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
  pageNo: string;

  constructor(private httpApi: HttpApiService, private route: ActivatedRoute, private router: Router) {
    this.pageNo = this.route.snapshot.paramMap.get('pn');

    this.httpApi.getThreads(this.pageNo)
      .subscribe(res => this.threads = res);
  }

  clickBtn() {
    this.httpApi.getOldThreads(this.threads.length)
      .subscribe(res => this.threads.concat(res));
  }

  prevPage() {
    this.pageNo = (parseInt(this.pageNo) - 1).toString();
    this.router.navigate(['page/' + this.pageNo]);
    this.httpApi.getThreads(this.pageNo)
      .subscribe(res => this.threads = res);
  }

  nextPage() {
    this.pageNo = (parseInt(this.pageNo) + 1).toString();
    this.router.navigate(['page/' + this.pageNo]);
    this.httpApi.getThreads(this.pageNo)
      .subscribe(res => this.threads = res);
  }
}
