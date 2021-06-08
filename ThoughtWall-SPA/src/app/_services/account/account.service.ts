import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelToken } from '../../_models/ModelToken';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl + '/profile';
  helper = new JwtHelperService();
  decodedToken: ModelToken;

  get getUserId() {
    return this.decodedToken.nameid;
  }

  get getUniqueName() {
    return this.decodedToken.unique_name;
  }

  constructor(private http: HttpClient) {
    this.decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
  }

  isLoggedIn(): boolean {
    return !this.helper.isTokenExpired(localStorage.getItem('token')) ? true : false;
  }
}
