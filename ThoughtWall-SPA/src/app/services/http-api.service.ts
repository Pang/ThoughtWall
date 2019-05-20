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

  private apiUrl = 'http://localhost:5000/api/values';

  getThreads(): Observable<[]> {
    return this.http.get<[]>(this.apiUrl);
  }

  // Uses length of current array of Threads to skip
  getOldThreads(currentSkip: number): Observable<[]> {
    const params = new HttpParams().set('skip', currentSkip.toString());
    return this.http.get<[]>(this.apiUrl + '/archives', {params});
  }

  // Takes an object from the ngform input and posts to API
  postThread(threadPost: any) {
    this.http.post(this.apiUrl + '/submit', threadPost).subscribe(
      x => {this.newPost.checkNewPost(true), this.router.navigate(['']); },
      err => console.log(err));
  }

  getFullThread(id: string) {
    return this.http.get(this.apiUrl + `/${id}`);
  }

  postComment(comment: any) {
    this.http.post(this.apiUrl + '/comment', comment).subscribe( x => console.log(x));
  }

  getComments(id: string): Observable<[]> {
    return this.http.get<[]>(this.apiUrl + `/${id}/comments`);
  }
}
