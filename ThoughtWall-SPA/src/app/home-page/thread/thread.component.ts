import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent {
  threads = [];
  currentSkip = 0;

  getThreads(): Observable<[]> {
    return this.http.get<[]>('http://localhost:5000/api/values');
  }

  constructor(private http: HttpClient, private router: Router) {
    this.getThreads().subscribe(res => this.threads = res);
  }

  getOldThreads(): Observable<[]> {
    this.currentSkip += 5;

    const params = new HttpParams().set('skip', this.currentSkip.toString());

    return this.http.get<[]>('http://localhost:5000/api/values/archives', {params});
  }

  clickBtn() {
    this.getOldThreads().subscribe(res => {
      this.threads = this.threads.concat(res);
    });
  }
}
