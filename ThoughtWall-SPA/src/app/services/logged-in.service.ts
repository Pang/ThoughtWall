import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  constructor() { }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
