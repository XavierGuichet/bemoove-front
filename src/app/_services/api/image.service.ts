import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response } from '@angular/http';
import { ApiService } from './api.service';

import 'rxjs/add/operator/toPromise';

import { BMImage } from '../../models/index';

@Injectable()
export class ImageService extends ApiService {
  private ImagesUrl = process.env.API_URL + '/images';

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public getAll(): Promise<BMImage[]> {
    return this.http.get(this.ImagesUrl, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as BMImage[])
      .catch((res) => this.handleError(res, this));
  }

  public getById(id: number): Promise<BMImage> {
    return this.http.get(this.ImagesUrl + '/' + id, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as BMImage)
      .catch((res) => this.handleError(res, this));
  }

  public create(Image: BMImage): Promise<BMImage> {
    return this.http.post(this.ImagesUrl, Image, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as BMImage)
      .catch((res) => this.handleError(res, this));
  }

  public update(Image: BMImage): Promise<BMImage> {
    return this.http.put(this.ImagesUrl + '/' + Image.id, Image, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as BMImage)
      .catch((res) => this.handleError(res, this));
  }

  public delete(id: number) {
    return this.http.delete(this.ImagesUrl + '/' + id, this.getRequestOptions())
      .map((response: Response) => response.json());
  }
}
