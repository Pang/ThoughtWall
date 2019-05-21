import { Component, ViewChild } from '@angular/core';
import { HttpApiService } from '../services/http-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent {
  // @ViewChild('commentForm') commentForm: NgForm;
  thread = {};
  comments = [];
  comment = {
    threadId : '',
    body: ''
  };

  constructor(private route: ActivatedRoute, private httpApi: HttpApiService) {
    this.comment.threadId = this.route.snapshot.paramMap.get('id');
    this.httpApi.getFullThread(this.comment.threadId)
        .subscribe(res => this.thread = res[0]);
    this.httpApi.getComments(this.comment.threadId)
        .subscribe(res => this.comments = res );
  }

  postComment() {
    this.comments.unshift({
      body: this.comment.body, threadId: this.comment.threadId
    });
    this.httpApi.postComment(this.comment);
    this.comment.body =  '';
  }

}
