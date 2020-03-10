import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/profile';

  getUsersThreads(id: number): Observable<[]> {
    return this.http.get<[]>(this.apiUrl + `/threads?id=${id}`);
  }

  getUsersComments(id: number): Observable<[]> {
    return this.http.get<[]>(this.apiUrl + `/comments?id=${id}`);
  }

  loggedin(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
