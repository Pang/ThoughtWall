import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  constructor(private http: HttpClient, private router: Router) { }

  private apiUrl = 'http://localhost:5000/api/values';

  getThreads(): Observable<[]> {
    return this.http.get<[]>(this.apiUrl);
  }

  // Uses length of current array of Threads to skip
  getOldThreads(currentSkip: number): Observable<[]> {
    const params = new HttpParams().set('skip', currentSkip.toString());
    return this.http.get<[]>(this.apiUrl + '/archives', {params});
  }

  redirectTo(title: string): Observable<{}> {
    const params = new HttpParams().set('title', title.toString());
    return this.http.get<{}>(this.apiUrl + '/redirect', {params});
  }

  // Takes an object from the ngform input and posts to API
  postThread(threadPost: any) {
    this.http.post(this.apiUrl + '/submit', threadPost).subscribe(
      x => this.redirectTo(threadPost.title).subscribe(
        res => this.router.navigate([`/thread/${res['id']}`]),
        err => console.log(err)
      )
    );
  }

  getFullThread(id: string) {
    return this.http.get(this.apiUrl + `/${id}`);
  }

  postComment(comment: any) {
    return this.http.post(this.apiUrl + '/comment', comment);
  }

  getComments(id: string): Observable<[]> {
    return this.http.get<[]>(this.apiUrl + `/${id}/comments`);
  }
}
