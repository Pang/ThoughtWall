import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})

export class ThreadComponent implements OnInit {
  threads = [];
  currentSkip = 0;
  newThread = false;

  getThreads(): Observable<[]> {
    return this.http.get<[]>('http://localhost:5000/api/values');
  }

  constructor(private http: HttpClient, private newPost: DataService) {
    this.getThreads().subscribe(res => this.threads = res);

    this.newPost.newPost.subscribe((x: boolean) => {
      if (x === true) {
        this.newThread = true;
      }
    });

    window.onbeforeunload = () => {
      this.newThread = false;
    }
  }
  ngOnInit() {
    // this.newThread = false;
  }

  getOldThreads(): Observable<[]> {
    this.currentSkip += 5;

    const params = new HttpParams().set('skip', this.currentSkip.toString());

    return this.http.get<[]>('http://localhost:5000/api/values/archives', {params});
  }

  clickBtn() {
    this.getOldThreads().subscribe(res => {
      this.threads = this.threads.concat(res);
      console.log(this.newThread);
    });
  }
}
