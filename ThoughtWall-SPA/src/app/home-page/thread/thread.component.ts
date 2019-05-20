import { Component } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})

export class ThreadComponent {
  threads = [];
  currentSkip = 0;

  constructor( private httpApi: HttpApiService) {
    this.httpApi.getThreads().subscribe(res => this.threads = res);
  }

  clickBtn() {
    this.httpApi.getOldThreads(this.threads.length).subscribe(res => {
      this.threads = this.threads.concat(res);
    });
  }
}
