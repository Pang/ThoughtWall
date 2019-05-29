import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/api/values';

  // Home page, most recent threads
  getThreads(): Observable<[]> {
    return this.http.get<[]>(this.apiUrl);
  }

  // Uses length of current array of Threads to skip
  getOldThreads(currentSkip: number): Observable<[]> {
    const params = new HttpParams().set('skip', currentSkip.toString());
    return this.http.get<[]>(this.apiUrl + '/archives', {params});
  }

  // get searched threads
  getSearchedThreads(keyword: string): Observable<[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<[]>(this.apiUrl + '/search', {params});
  }

  redirectTo(title: string): Observable<{}> {
    const params = new HttpParams().set('title', title.toString());
    return this.http.get<{}>(this.apiUrl + '/redirect', {params});
  }

  // Takes an object from the ngform input and posts to API
  postThread(threadPost: any) {
    return this.http.post(this.apiUrl + '/submit', threadPost);
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
