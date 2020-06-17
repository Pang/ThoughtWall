import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelComment } from 'src/app/_models/ModelComment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + '/values';

  createForm(): FormGroup {
    return new FormGroup({
      threadId: new FormControl(null, [Validators.required]),
      comment: new FormControl(null, [Validators.required]),
    });
  }

  postComment(comment: FormGroup) {
    return this.http.post(this.apiUrl + '/comment', comment);
  }

  getComments(id: string): Observable<ModelComment[]> {
    return this.http.get<[]>(this.apiUrl + `/${id}/comments`);
  }

  getLatestComments(id: string) {
    return this.http.get<ModelComment>(this.apiUrl + `/${id}/latestComment`);
  }
}
