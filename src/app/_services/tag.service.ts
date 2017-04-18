import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';

import { Tag }    from '../models/tag';

@Injectable()
export class TagService {
    private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    private headers_search = new Headers({'Accept': 'application/json'});
    private tagsUrl = 'http://api.bemoove.local/tags';

    constructor(
            private http: Http) {}

    search (term: string) {
        console.log("tag service search");
        return this.http.get(this.tagsUrl + '?name='+term)
               .map(response => <string[]> response.json());
    }

    searchExample (term: string) {
        return this.search(term);
    //   let wikiUrl = 'http://en.wikipedia.org/w/api.php';
    //   let params = new URLSearchParams();
    //   params.set('search', term); // the user's search value
    //   params.set('action', 'opensearch');
    //   params.set('format', 'json');
    //   params.set('callback', 'JSONP_CALLBACK');
    //   // TODO: Add error handling
    //   return this.jsonp
    //              .get(wikiUrl, { search: params })
    //              .map(response => <string[]> response.json()[1]);
    }

    create(tag: Tag) {
        return this.http.post(this.tagsUrl, tag, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'Content-Type': 'application/json', 'Accept': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
