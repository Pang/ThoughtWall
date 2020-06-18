import { Component, OnInit } from '@angular/core';

import { AccountService } from 'src/app/_services/account/account.service';
import { CommentService } from 'src/app/_services/thread/comment.service';
import { FormGroup } from '@angular/forms';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { ModelComment } from 'src/app/_models/ModelComment';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  connection = new HubConnectionBuilder().withUrl('http://localhost:5000/postHub').build();
  comments: ModelComment[] = [];
  commentForm: FormGroup;
  errorMsg: string;

  constructor(private store: Store<{ currentThread: {} }>, private commentService: CommentService, private accountService: AccountService) { }

  ngOnInit() {
    this.commentForm = this.commentService.createForm();
    this.store.select('currentThread').subscribe((data: { threadId: string }) => {
      this.commentForm.get('threadId').patchValue(data.threadId);
      this.getData(this.commentForm.value.threadId);
    });
    this.signalRSubs();
  }

  getData(id: string) {
    this.commentService.getComments(id)
      .subscribe(res => {
        if (res.length > 0) {
          this.comments = res;
        }
      });
  }

  signalRSubs() {
    this.connection.start().then(x => this.connection.invoke('JoinThread', this.commentForm.value.threadId)).catch(err => console.log(err));
    this.connection.on('newComment', () => {
      this.commentService.getLatestComments(this.commentForm.value.threadId).subscribe(res => this.comments.unshift(res));
    });
  }

  postComment() {
    if (this.commentForm.get('body').value.length < 255 && this.commentForm.get('body').value.length > 3) {
      this.commentService.postComment(this.commentForm.value).subscribe(
        () => {
          this.commentForm.get('body').reset();
        },
        err => this.errorMsg = err.error.errors.Body[0]
      );
    }
  }

  loggedIn() {
    return this.accountService.isLoggedIn();
  }

  ngOnDestroy() {
    this.connection.invoke('LeaveThread', this.commentForm.value.threadId);
    // this.connection.stop();
  }
}
