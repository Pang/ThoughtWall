import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  constructor(private http: HttpClient) { }
  threads = [];

  getThreads(): Observable<[]> {
    return this.http.get<[]>('http://localhost:5000/api/values');
  }

  ngOnInit() {
    this.getThreads().subscribe(res => this.threads = res);
  }

}
