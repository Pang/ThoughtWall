import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiUrl + '/auth';
  constructor(private http: HttpClient) { }

  createForm(): FormGroup {
    return new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  post(form: FormGroup) {
    return this.http.post(this.baseUrl + '/login', form)
  }
}
