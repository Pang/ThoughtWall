import * as ThreadPageActions from './store/thread.actions';

import { Component, OnInit } from '@angular/core';

import { AccountService } from 'src/app/_services/account/account.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelComment } from 'src/app/_models/ModelComment';
import { ModelThread } from 'src/app/_models/ModelThread';
import { Store } from '@ngrx/store';
import { ThreadService } from 'src/app/_services/thread/thread.service';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit {
  helper = new JwtHelperService();
  comments: ModelComment[];
  threadForm: FormGroup;
  thread: ModelThread;
  editEnabled = false;
  edittedBody: string;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private accountService: AccountService,
    private store: Store<{ currentThread: {} }>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new ThreadPageActions.ChangeThread({ threadId: this.route.snapshot.paramMap.get('id') }));
    this.threadForm = this.threadService.createForm();
    this.store.select('currentThread').subscribe((data: { threadId: string }) => {
      this.threadForm.get('id').patchValue(data.threadId)
      this.getData();
    })
  }

  getData() {
    this.threadService.getFullThread(this.threadForm.get('id').value)
      .subscribe(res => {
        this.thread = res;
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

  canEdit() {
    if (this.accountService.isLoggedIn()) {
      if (this.accountService.getUniqueName === this.thread.username) {
        return true;
      }
    }
    return false;
  }


}
