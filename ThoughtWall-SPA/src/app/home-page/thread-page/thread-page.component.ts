import { Component, OnDestroy, OnInit } from '@angular/core';

import { AccountService } from 'src/app/_services/account/account.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/_services/thread/comment.service';
import { FormGroup } from '@angular/forms';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelThread } from 'src/app/_models/ModelThread';
import { ThreadService } from 'src/app/_services/thread/thread.service';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit, OnDestroy {
  connection = new HubConnectionBuilder().withUrl('http://localhost:5000/postHub').build();
  helper = new JwtHelperService();
  comments: any[];
  thread: ModelThread;
  commentForm: FormGroup;
  comment = {
    threadId: '',
    body: ''
  };
  errorMsg: string;
  editEnabled = false;
  edittedBody: string;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private commentService: CommentService,
    private accountService: AccountService
  ) {
    this.comment.threadId = this.route.snapshot.paramMap.get('id');
    this.threadService.getFullThread(this.comment.threadId)
      .subscribe(res => this.thread = res);
    this.commentService.getComments(this.comment.threadId)
      .subscribe(res => {
        if (res.length > 0) {
          this.comments = res;
        }
      });
  }

  ngOnInit() {
    this.commentForm = this.commentService.createForm();
    this.connection.start().then(x => this.connection.invoke('JoinThread', this.comment.threadId)).catch(err => console.log(err));
    this.connection.on('newComment', data => {
      this.commentService.getLatestComments(this.comment.threadId).subscribe(res => this.comments.unshift(res));
    });
  }

  editButton() {
    this.edittedBody = this.thread.body;
    this.editEnabled = !this.editEnabled;
  }

  editThread() {
    // let newThread = this.thread;
    // newThread.body = this.edittedBody;

    // this.threadService.editThread(newThread).subscribe(
    //   res => { this.errorMsg = '', this.comment.body = ''; },
    //   err => this.errorMsg = err.error.errors.Body[0]
    // );
    // this.editEnabled = false;
  }

  postComment() {
    if (this.commentForm.get('comment').value.length < 255 && this.commentForm.get('comment').value.length > 3) {
      this.commentService.postComment(this.commentForm).subscribe(
        res => this.commentForm.reset(),
        err => this.errorMsg = err.error.errors.Body[0]
      );
    }
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  canEdit() {
    if (this.accountService.loggedin()) {
      const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
      if (decodedToken['unique_name'] == this.thread.username) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy() {
    //this.connection.invoke("LeaveThread", this.comment.threadId);
    this.connection.stop();
  }
}
