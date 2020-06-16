import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { CommentModel } from '../models/commentModel';
import { ThreadModel } from '../models/threadModel';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/values';

  // Home page, most recent threads
  getThreads(): Observable<[]> {
    // const params = new HttpParams().set('pageNo', pageNo.toString());
    return this.http.get<[]>(this.apiUrl);
  }

  // Uses length of current array of Threads to skip
  getOldThreads(skip: number): Observable<[]> {
    const params = new HttpParams().set('skip', skip.toString());
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

  editThread(edittedPost: any) {
    return this.http.put(this.apiUrl + '/edit', edittedPost);
  }

  getFullThread(id: string) {
    return this.http.get<ThreadModel>(this.apiUrl + `/${id}`);
  }

  postComment(comment: any) {
    return this.http.post(this.apiUrl + '/comment', comment);
  }

  getComments(id: string): Observable<[]> {
    return this.http.get<[]>(this.apiUrl + `/${id}/comments`);
  }

  getLatestComments(id: string) {
    return this.http.get<CommentModel>(this.apiUrl + `/${id}/latestComment`);
  }
}
