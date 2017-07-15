import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Booking } from '../models/booking';
import { BookingApi } from './api-models/booking-api';

import { JwtHelper } from 'angular2-jwt';
import { SpaceService } from '../_services/space.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {
    private jwtHelper: JwtHelper = new JwtHelper();
    private headers = new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'});
    private bookingUrl = 'http://' + process.env.API_URL + '/bookings';
    private bookingApi: BookingApi;
    constructor(private http: Http, private spaceService: SpaceService) { }

    public getAll(): Promise<Booking[]> {
      return this.http.get(this.bookingUrl, this.jwt())
                 .toPromise()
                 .then((response) => response.json() as Booking[]);
    }

    // public getById(id: number) {
    //     return this.http.get(this.bookingUrl + '/' + id, this.jwt())
    //                     .map((response: Response) => response.json());
    // }

    public create(booking: Booking) {
        this.bookingApi = new BookingApi(booking);
        console.log(this.bookingApi);
        return this.http.post(this.bookingUrl, this.bookingApi, this.jwt())
                        .map((response: Response) => response.json());
    }

    // public update(booking: Booking) {
    //     return this.http.put(this.bookingUrl + '/' + sport.id, sport, this.jwt())
    //                     .map((response: Response) => response.json());
    // }
    //
    // public delete(id: number) {
    //     return this.http.delete(this.bookingUrl + '/' + id, this.jwt())
    //                     .map((response: Response) => response.json());
    // }

    private jwt() {
        // create authorization header with jwt token
        let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
        if (currentAccount && currentAccount.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentAccount.token ,
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json' });
            return new RequestOptions({ headers });
        }
    }
}
