import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import { Reservation } from '../../models/index';
import { ReservationApi } from './api-models/reservation-api';

@Injectable()
export class ReservationService extends ApiService {
  private reservationUrl = process.env.API_URL + '/reservations';
  private reservationApi: ReservationApi;

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public create(reservation: Reservation): Promise<Reservation> {
    this.reservationApi = new ReservationApi(reservation);
    return this.http.post(this.reservationUrl,
      this.reservationApi,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Reservation)
      .catch((res) => this.handleError(res, this));
  }

  /**
   * Get all reservation of the currently connected user (JWT)
   */
  public getMyReservations(): Promise<Reservation[]> {
      let url = process.env.API_URL + '/getMyReservations';
      return this.http.get(url, this.getRequestOptions())
            .toPromise()
            .then((response) => response.json() as Reservation[])
            .catch((res) => this.handleError(res, this));
  }

  public getMyFutureReservations(personId: number): Promise<Reservation[]> {
      let today = new Date();
      return this.http.get(this.reservationUrl + '?workoutInstance.startdate[after]=' + today.toISOString() + '&person.id=' + personId,
                this.getRequestOptions())
            .toPromise()
            .then((response) => response.json() as Reservation[])
            .catch((res) => this.handleError(res, this));
  }

  public getMyPastReservations(personId: number): Promise<Reservation[]> {
      let today = new Date();
      return this.http.get(this.reservationUrl + '?workoutInstance.startdate[before]=' + today.toISOString() + '&person.id=' + personId,
                this.getRequestOptions())
            .toPromise()
            .then((response) => response.json() as Reservation[])
            .catch((res) => this.handleError(res, this));
  }

  public getReservationsByWorkoutInstanceId(workoutInstanceId: number): Promise<Reservation[]> {
      return this.http.get(this.reservationUrl + '?workoutInstance.id=' + workoutInstanceId,
        this.getRequestOptions())
        .toPromise()
        .then((response) => response.json() as Reservation[])
        .catch((res) => this.handleError(res, this));
  }
}
