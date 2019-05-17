import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpApiService } from 'src/app/services/http-api.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})

export class ThreadComponent {
  threads = [];
  currentSkip = 0;
  newThread = false;

  constructor(private newPost: DataService, private httpApi: HttpApiService) {
    this.httpApi.getThreads().subscribe(res => this.threads = res);
    this.newPost.newPost.subscribe((x: boolean) => {
      if (x === true) {
        this.newThread = true;

        // Timeout is to allow CSS animation to run
        setTimeout(() => {
          this.newPost.checkNewPost(false);
        }, 500);
      }
    });
  }

  clickBtn() {
    this.httpApi.getOldThreads(this.threads.length).subscribe(res => {
      this.threads = this.threads.concat(res);
      console.log(this.newThread);
    });
  }
}
