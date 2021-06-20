import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelProfile } from 'app/components/account/_models/ModelProfile';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { ModelBooking, ModelBookingCreate } from '../_models/ModelBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = environment.apiUrl + '/booking';
  constructor(private http: HttpClient) { }

  createForm(): FormGroup {
    return new FormGroup({
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
    });
  }

  createBooking(form: ModelBookingCreate) {
    return this.http.post(this.baseUrl + '/request', form);
  }

  getAllBookings(): Observable<ModelBooking[]> {
    return this.http.get<ModelBooking[]>(this.baseUrl + '/all');
  }

  getCreatedBookings(): Observable<ModelBooking[]> {
      return this.http.get<ModelBooking[]>(this.baseUrl + '/created');
  }
}
