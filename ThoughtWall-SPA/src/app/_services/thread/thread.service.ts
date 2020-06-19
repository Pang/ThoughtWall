import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ModelThread } from 'src/app/_models/ModelThread';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + '/values';

  createForm() {
    return new FormGroup({
      id: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });
  }

  // Home page, most recent threads
  getThreads(): Observable<ModelThread[]> {
    return this.http.get<ModelThread[]>(this.apiUrl);
  }

  // TDDO: For future lazy loading more threads
  getMoreThreads(): Observable<ModelThread[]> {
    return;
  }

  getSearch(keyword: string): Observable<ModelThread[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<[]>(this.apiUrl + '/search', { params });
  }

  redirectTo(title: string): Observable<{}> {
    const params = new HttpParams().set('title', title.toString());
    return this.http.get<{}>(this.apiUrl + '/redirect', { params });
  }

  // TODO: find way to get post to return ID for redirecting user
  postThread(form: FormGroup) {
    return this.http.post(this.apiUrl + '/submit', form);
  }

  editThread(form: FormGroup) {
    return this.http.put(this.apiUrl + '/edit', form);
  }

  getFullThread(id: string): Observable<ModelThread> {
    return this.http.get<ModelThread>(this.apiUrl + `/${id}`);
  }


}
