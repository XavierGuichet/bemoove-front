import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http,  Response, Jsonp, URLSearchParams  } from '@angular/http';
import { ApiService } from './api.service';

import { Tag } from '../../models/tag';

@Injectable()
export class TagService extends ApiService {
  private headersSearch = new Headers({ Accept: 'application/json' });
  private tagsUrl = process.env.API_URL + '/tags';

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public search(term: string) {
    return this.http.get(this.tagsUrl + '?name=' + term)
      .map((response) => response.json() as string[]);
  }

  public create(tag: Tag) {
    return this.http.post(this.tagsUrl, tag, this.getRequestOptions()).map(
      (response: Response) => response.json()
    );
  }
}
