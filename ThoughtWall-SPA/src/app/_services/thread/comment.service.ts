import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModelComment } from 'src/app/_models/ModelComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + '/values';

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
