import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thread-summary',
  template: `
    <div class="container">
      <mat-card *ngFor="let thread of threads"
      [routerLink]="['/thread', thread.id]">
        <mat-card-header>
          <div mat-card-avatar class="centre">{{ thread.username.slice(0,1) | uppercase}}</div>
          <mat-card-title>{{ thread.title }}</mat-card-title>
          <mat-card-subtitle><span style="color:#4DD0E1">{{ thread.username | titlecase }}</span> |
          {{ thread.comments.length }} comment{{ thread.comments.length == 1 ? '' : 's' }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ thread.body | slice:0:200 }}
          {{ thread.body.length <= 200 ? '' : '...' }}
          </p>
        </mat-card-content><br />
        <div class="cardFooter">{{ thread.timeStamp | timeAgo  }}</div>
      </mat-card>
    <div>
  `,
  styleUrls: ['./thread-summary.component.css'],
})

export class ThreadSummaryComponent {
  @Input() threads: [];

  constructor() {
  }
}
