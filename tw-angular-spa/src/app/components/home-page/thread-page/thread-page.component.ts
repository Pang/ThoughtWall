import * as ThreadPageActions from './store/thread.actions';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { AccountService } from '../../account/_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelComment } from '../_models/ModelComment';
import { Store } from '@ngrx/store';
import { ThreadService } from '../_services/thread.service';
import { ModelThread } from '../_models/ModelThread';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thread-page',
  template: `
    <mat-card *ngIf="thread; else loadingSpinner" class="shadow">
      <h1 class="threadTitle">{{ thread.title }}</h1>
      <span style="color:#4DD0E1">{{ thread.username | titlecase }}</span>
      <span class="timeStamp">
        ~ {{ thread.timeStamp | date:'longDate' }}.
        {{ thread.timeStamp | date:'shortTime' }}
      </span>
      <button id="editBtn" *ngIf="canEdit()" mat-icon-button color="accent" (click)="this.editEnabled = !this.editEnabled">
        <mat-icon class="example-icon" aria-hidden="false">edit</mat-icon>
      </button>
      <hr>
      <p *ngIf="!editEnabled">{{ thread.body }}</p>
      <form [formGroup]="threadForm" *ngIf="editEnabled">
        <app-mat-textarea [formGroup]="threadForm" formControlName="body"
          [value]="thread.body" ngDefaultControl></app-mat-textarea>
        <button mat-flat-button color="accent" type="button" (click)="editThread()">Save</button>
      </form>
    </mat-card>

    <ng-template #loadingSpinner>
      <mat-spinner color="accent"></mat-spinner>
    </ng-template>

    <app-comment></app-comment>
  `,
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit, OnDestroy {
  storeSub$: Subscription;
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
    this.threadForm = this.threadService.createForm();
    this.store.dispatch(new ThreadPageActions.ChangeThread({ threadId: this.route.snapshot.paramMap.get('id') }));
    this.storeSub$ = this.store.select('currentThread').subscribe((data: { threadId: string }) => {
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

  ngOnDestroy() {
    this.storeSub$.unsubscribe();
  }
}
