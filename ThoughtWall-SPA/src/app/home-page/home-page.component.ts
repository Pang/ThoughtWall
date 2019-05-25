import { Component } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  threads = [];

  constructor(private httpApi: HttpApiService) {
    this.httpApi.getThreads()
      .subscribe(res => this.threads = res);
  }

  clickBtn() {
    this.httpApi.getOldThreads(this.threads.length)
      .subscribe(res => this.threads = this.threads.concat(res));
  }
}
