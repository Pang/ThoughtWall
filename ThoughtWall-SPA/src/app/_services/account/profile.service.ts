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

  getProfileData(username: string): Observable<ModelProfile> {
    return this.http.get<any>(this.baseUrl + `?username=${username}`);
  }
}
