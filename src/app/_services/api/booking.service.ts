import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import { Booking } from '../../models/booking';
import { BookingApi } from './api-models/booking-api';

import { Observable } from 'rxjs/Observable'; // TODO : check usefullness
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService extends ApiService {
  private bookingUrl = process.env.API_URL + '/bookings';
  private bookingApi: BookingApi;
  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public getAll(): Promise<Booking[]> {
    return this.http.get(this.bookingUrl, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Booking[])
      .catch((res) => this.handleError(res, this));
  }

  public create(booking: Booking): Promise<Booking> {
    this.bookingApi = new BookingApi(booking);
    return this.http.post(this.bookingUrl, this.bookingApi, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Booking)
      .catch((res) => this.handleError(res, this));
  }
}
