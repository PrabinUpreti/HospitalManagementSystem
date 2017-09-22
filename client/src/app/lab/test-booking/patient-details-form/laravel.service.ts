import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LaravelService {

  constructor(private http: Http) { }

  getData(paramData){
  	
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});

    return this.http.post("http://server.hms.com/api/test-booking", paramData, options)
        .map(this.extractData)
        .catch(this.handleError)
        // .retry(3);
  }

  private extractData(res: Response) {
    let response = res.json();
    return response || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
