import * as ThreadPageActions from './store/thread.actions';

import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../../_services/account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelComment } from '../../../_models/ModelComment';
import { ModelThread } from '../../../_models/ModelThread';
import { Store } from '@ngrx/store';
import { ThreadService } from '../../../_services/thread/thread.service';

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
  errorMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private threadService: ThreadService,
    private accountService: AccountService,
    private store: Store<{ currentThread: {} }>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new ThreadPageActions.ChangeThread({ threadId: this.route.snapshot.paramMap.get('id') }));
    this.threadForm = this.threadService.createForm();
    this.store.select('currentThread').subscribe((data: { threadId: string }) => {
      this.threadForm.get('id').patchValue(data.threadId);
      this.getData();
    });
  }

  getData() {
    this.threadService.getFullThread(this.threadForm.get('id').value)
      .subscribe(
        (res) => {
          this.thread = res;
          this.threadForm.patchValue({
            username: res.username,
            title: res.title,
            body: res.body,
          });
        },
        () => this.router.navigate(['/404'])
      );
  }

  editThread() {
    this.threadService.editThread(this.threadForm.value).subscribe(
      () => {
        this.threadForm.get('body').patchValue('');
        this.editEnabled = false;
        this.getData();
      },
      err => this.errorMsg = err
    );
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
