import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../_services/http-api.service';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { ThreadModel } from '../models/threadModel';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit, OnDestroy {
  connection = new HubConnectionBuilder().withUrl('http://localhost:5000/postHub').build();
  comments = [];
  thread: ThreadModel;
  comment = {
    threadId: '',
    body: ''
  };
  errorMsg: string;
  editEnabled = false;
  edittedBody: string;

  constructor(private route: ActivatedRoute, private httpApi: HttpApiService, ) {
    this.comment.threadId = this.route.snapshot.paramMap.get('id');
    this.httpApi.getFullThread(this.comment.threadId)
      .subscribe(res => this.thread = res);
    this.httpApi.getComments(this.comment.threadId)
      .subscribe(res => this.comments = res);
  }
  ngOnInit() {
    this.connection.start().then(x => this.connection.invoke("JoinThread", this.comment.threadId)).catch(err => console.log(err));
    this.connection.on("newComment", data => {
      this.httpApi.getLatestComments(this.comment.threadId).subscribe(res => this.comments.unshift(res));
    });
  }

  editButton() {
    this.edittedBody = this.thread.body;
    this.editEnabled = !this.editEnabled;
  }

  editThread() {
    var newThread = this.thread;
    newThread.body = this.edittedBody;

    this.httpApi.editThread(newThread).subscribe(
      res => { this.errorMsg = '', this.comment.body = ''; },
      err => this.errorMsg = err.error.errors.Body[0]
    );
    this.editEnabled = false;
  }

  postComment() {
    if (this.comment.body.length < 255 && this.comment.body.length > 3) {
      this.httpApi.postComment(this.comment).subscribe(
        res => { this.errorMsg = '', this.comment.body = ''; },
        err => this.errorMsg = err.error.errors.Body[0]
      );
    }
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  ngOnDestroy() {
    //this.connection.invoke("LeaveThread", this.comment.threadId);
    this.connection.stop();
  }
}
