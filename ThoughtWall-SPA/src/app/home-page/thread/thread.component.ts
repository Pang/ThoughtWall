import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  threads = [];

  constructor(private http: HttpClient) {
    this.getThreads().subscribe(res => this.threads = res);
  }

  getThreads(): Observable<[]> {
    return this.http.get<[]>('http://localhost:5000/api/values');
  }

  ngOnInit() {
  }
}
