import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileHttpApiService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/profile';

  getUsersThreads(id: number): Observable<[]> {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<[]>(this.apiUrl + `/threads?id=${id}`, {headers: header});
  }

  getUsersComments(id: number): Observable<[]> {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<[]>(this.apiUrl + `/comments?id=${id}`, {headers: header});
  }

}
