import { Component } from '@angular/core';
import { HttpApiService } from '../services/http-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent {
  thread = {};
  comments = [];
  comment = {
    threadId : '',
    body: ''
  };
  errorMsg: string;

  constructor(private route: ActivatedRoute, private httpApi: HttpApiService) {
    this.comment.threadId = this.route.snapshot.paramMap.get('id');
    this.httpApi.getFullThread(this.comment.threadId)
        .subscribe(res => this.thread = res[0]);
    this.httpApi.getComments(this.comment.threadId)
        .subscribe(res => this.comments = res );
  }

  postComment() {
    if (this.comment.body.length < 255 && this.comment.body.length > 3) {
      this.comments.unshift({
        body: this.comment.body,
        threadId: this.comment.threadId
      });
    }
    this.httpApi.postComment(this.comment).subscribe(
      res => {this.errorMsg = '', this.comment.body = ''; },
      err => this.errorMsg = err.error.errors.Body[0]
    );
  }

}
