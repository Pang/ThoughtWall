import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  constructor(private http: HttpClient, private router: Router, private newPost: DataService ) { }

  getThreads(): Observable<[]> {
    return this.http.get<[]>('http://localhost:5000/api/values');
  }

  // Uses length of current array of Threads to skip
  getOldThreads(currentSkip: number): Observable<[]> {
    const params = new HttpParams().set('skip', currentSkip.toString());
    return this.http.get<[]>('http://localhost:5000/api/values/archives', {params});
  }

  // Takes an object from the ngform input and posts to API
  onSubmit(threadPost: any) {
    this.http.post('http://localhost:5000/api/values/submit', threadPost).subscribe(
      x => {this.router.navigate(['']), this.newPost.checkNewPost(true); },
      err => console.log(err));
  }

  getFullThread(id: string) {
    return this.http.get(`http://localhost:5000/api/values/${id}`);
  }
}
