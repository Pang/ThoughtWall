import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { ModelComment } from '../_models/ModelComment';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + '/thread';

  createForm(): FormGroup {
    return new FormGroup({
      threadId: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });
  }

  postComment(comment: FormGroup) {
    return this.http.post(this.apiUrl + '/comment', comment);
  }

  getComments(id: string): Observable<ModelComment[]> {
    return this.http.get<ModelComment[]>(this.apiUrl + `/${id}/comments`);
  }

  getLatestComments(id: string) {
    return this.http.get<ModelComment>(this.apiUrl + `/${id}/latestComment`);
  }
}
