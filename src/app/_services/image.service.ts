import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Image } from '../models/image';

@Injectable()
export class ImageService {
    private headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept': 'application/json'});
    private ImagesUrl = 'http://' + process.env.API_URL + '/images';

    constructor(private http: Http) { }

    public getAll(): Promise<Image[]> {
      return this.http.get(this.ImagesUrl, this.jwt())
                 .toPromise()
                 .then((response) => response.json() as Image[]);
    }

    public getById(id: number) {
        return this.http.get(this.ImagesUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    public create(Image: Image) {
        return this.http.post(this.ImagesUrl, Image, this.jwt())
                        .map((response: Response) => response.json());
    }

    public update(Image: Image) {
        return this.http.put(this.ImagesUrl + '/' + Image.id, Image, this.jwt())
                        .map((response: Response) => response.json());
    }

    public delete(id: number) {
        return this.http.delete(this.ImagesUrl + '/' + id, this.jwt())
                        .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token ,
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json' });
            return new RequestOptions({ headers });
        }
    }
}
