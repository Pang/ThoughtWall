import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/values';

  // Home page, most recent threads
  getThreads(): Observable<[]> {
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
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.apiUrl + '/submit', threadPost, { headers: header });
  }

  getFullThread(id: string) {
    return this.http.get(this.apiUrl + `/${id}`);
  }

  postComment(comment: any) {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.apiUrl + '/comment', comment, { headers : header });
  }

  getComments(id: string): Observable<[]> {
    return this.http.get<[]>(this.apiUrl + `/${id}/comments`);
  }
}
