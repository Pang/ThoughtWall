import { Component, OnDestroy, OnInit } from '@angular/core';

import { AccountService } from 'src/app/_services/account/account.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/_services/thread/comment.service';
import { FormGroup } from '@angular/forms';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelThread } from 'src/app/_models/ModelThread';
import { ThreadService } from 'src/app/_services/thread/thread.service';
import { ModelComment } from 'src/app/_models/ModelComment';
import * as ThreadPageActions from './store/account.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit, OnDestroy {
  connection = new HubConnectionBuilder().withUrl('http://localhost:5000/postHub').build();
  helper = new JwtHelperService();
  comments: ModelComment[];
  thread: ModelThread;
  comment = {
    threadId: '',
    body: ''
  };
  editEnabled = false;
  edittedBody: string;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private commentService: CommentService,
    private accountService: AccountService,
    private store: Store<{changeThread: {}}>,
  ) {
    this.comment.threadId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.getData().then(() => this.store.dispatch(new ThreadPageActions.ChangeThread(this.thread.id)));
    this.store.select('changeThread').subscribe(data => {
      console.log(data);
    })
    // TODO: put signalR stuff into a service
    this.connection.start().then(x => this.connection.invoke('JoinThread', this.comment.threadId)).catch(err => console.log(err));
    this.connection.on('newComment', data => {
      this.commentService.getLatestComments(this.comment.threadId).subscribe(res => this.comments.unshift(res));
    });
  }

  getData() {
    return new Promise((resolve, reject) => {
      this.threadService.getFullThread(this.comment.threadId)
      .subscribe(res => {
        this.thread = res;
        resolve();
      });
      this.commentService.getComments(this.comment.threadId)
      .subscribe(res => {
        if (res.length > 0) {
          this.comments = res;
        }
      });
    })

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

  canEdit() {
    if (this.accountService.isLoggedIn()) {
      if (this.accountService.getUniqueName === this.thread.username) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy() {
    this.connection.invoke('LeaveThread', this.comment.threadId);
    this.connection.stop();
  }
}
