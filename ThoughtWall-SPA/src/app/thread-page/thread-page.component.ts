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
    ThreadId : '',
    Body: ''
  };

  constructor(private route: ActivatedRoute, private httpApi: HttpApiService) {
    this.comment.ThreadId = this.route.snapshot.paramMap.get('id');
    this.httpApi.getFullThread(this.comment.ThreadId).subscribe(res => this.thread = res[0]);
    this.httpApi.getComments(this.comment.ThreadId).subscribe(res => this.comments = res );
  }

  postComment() {
    this.httpApi.postComment(this.comment);
    this.comments.unshift(this.comment);
  }

}
