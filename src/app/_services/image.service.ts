﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BMImage } from '../models/index';

@Injectable()
export class ImageService {
    private headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private ImagesUrl = process.env.API_URL + '/images';

    constructor(private http: Http) { }

    public getAll(): Promise<BMImage[]> {
      return this.http.get(this.ImagesUrl, this.jwt())
                 .toPromise()
                 .then((response) => response.json() as BMImage[]);
    }

    public getById(id: number) {
        return this.http.get(this.ImagesUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    public create(Image: BMImage): Promise<BMImage> {
        return this.http.post(this.ImagesUrl, Image, this.jwt())
        .toPromise()
        .then((response) => response.json() as BMImage);
    }

    public update(Image: BMImage): Promise<BMImage> {
        return this.http.put(this.ImagesUrl + '/' + Image.id, Image, this.jwt())
        .toPromise()
        .then((response) => response.json() as BMImage);
    }

    public delete(id: number) {
        return this.http.delete(this.ImagesUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    // private helper methods
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
