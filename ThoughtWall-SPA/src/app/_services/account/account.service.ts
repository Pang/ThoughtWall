import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelToken } from '../../_models/ModelToken';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  helper = new JwtHelperService();
  decodedToken: ModelToken;

  get getUserId() {
    return this.decodedToken?.nameid;
  }
  get getUniqueName() {
    return this.decodedToken?.unique_name;
  }

  constructor() {
    this.decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
  }

  isLoggedIn(): boolean {
    return !this.helper.isTokenExpired(localStorage.getItem('token')) ? true : false;
  }
}
