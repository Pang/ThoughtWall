import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelToken } from '../../_models/ModelToken';
import { ModelProfile } from 'app/_models/ModelProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environment.apiUrl + '/profile';
  constructor(private http: HttpClient) { }

  getProfileData(id: string): Observable<ModelProfile> {
    return this.http.get<any>(this.baseUrl + `?id=${id}`);
  }

  getUsersThreads(id: any): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + `/threads?id=${id}`);
  }

  getUsersComments(id: any): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + `/comments?id=${id}`);
  }
}
