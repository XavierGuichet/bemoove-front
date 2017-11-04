import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';

import { Person } from '../models/person';
import { PersonApi } from './api-models/person-api';

@Injectable()
export class PersonService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  private headersSearch = new Headers({ Accept: 'application/json' });
  private personsUrl = process.env.API_URL + '/people';
  private personApi: PersonApi;

  constructor(
    private http: Http) { }

  public create(person: Person) {
    this.personApi = new PersonApi(person);
    return this.http.post(this.personsUrl, this.personApi, this.jwt()).map(
      (response: Response) => response.json()
    );
  }

  public update(person: Person): Promise<Person> {
    this.personApi = new PersonApi(person);
    return this.http.put(this.personsUrl + '/' + person.id,
      this.personApi,
      this.jwt())
      .toPromise()
      .then((response) => response.json() as Person)
      .catch(this.handleError);
  }

  public getByOwnerId(id: number): Promise<Person> {
    return this.http.get(this.personsUrl + '?owner.id=' + id, this.jwt())
      .toPromise()
      .then((response) => response.json() as Person)
      .catch(this.handleError);
  }

  private jwt() {
    // create authorization header with jwt token
    let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
    if (currentAccount && currentAccount.token) {
      let headers = new Headers({
        'Authorization': 'Bearer ' + currentAccount.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      return new RequestOptions({ headers });
    }
  }

  private handleError(error: any): Promise<any> {
    if (error.code === 401) {
      alert(error.message);
    } else {
      console.error('An error occurred', error); // for demo purposes only
    }

    return Promise.reject(error.message || error);
  }
}
