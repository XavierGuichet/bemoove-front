import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { ApiService } from './api.service';

import { Person } from '../../models/person';
import { PersonApi } from './api-models/person-api';

@Injectable()
export class PersonService extends ApiService {
  private personsUrl = process.env.API_URL + '/people';
  private personApi: PersonApi;

  constructor(dialog: MatDialog, private http: Http) {
    super(dialog);
  }

  public create(person: Person): Promise<Person> {
    this.personApi = new PersonApi(person);
    return this.http.post(this.personsUrl,
      this.personApi,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Person)
      .catch((res) => this.handleError(res, this));
  }

  public update(person: Person): Promise<Person> {
    this.personApi = new PersonApi(person);
    return this.http.put(this.personsUrl + '/' + person.id,
      this.personApi,
      this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Person)
      .catch((res) => this.handleError(res, this));
  }

  public getByOwnerId(id: number): Promise<Person> {
    return this.http.get(this.personsUrl + '?owner.id=' + id, this.getRequestOptions())
      .toPromise()
      .then((response) => response.json() as Person)
      .catch((res) => this.handleError(res, this));
  }

  public getMyPerson(): Promise<Person> {
      let url = process.env.API_URL + '/getMyPerson';
      return this.http.get(url, this.getRequestOptions())
        .toPromise()
        .then((response) => response.json() as Person)
        .catch((res) => this.handleError(res, this));
  }
}
