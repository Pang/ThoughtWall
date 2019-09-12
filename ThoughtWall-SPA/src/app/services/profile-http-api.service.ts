import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileHttpApiService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/profile';

  getUsersThreads(id: number): Observable<[]> {
    return this.http.get<[]>(this.apiUrl + `/threads?id=${id}`);
  }

}
