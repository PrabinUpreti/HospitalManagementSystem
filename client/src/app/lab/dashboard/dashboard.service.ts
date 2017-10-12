import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DashboardService {

  constructor(private http:Http) { }

  getPatient(){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});

    return this.http.get("http://server.hms.com/api/dashboard", options)
        .map(this.extractData)
        .catch(this.handleError)

  }

  // getDoctor(){
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers,withCredentials: true});

  //   return this.http.get("http://server.hms.com/api/test-booking", options)
  //       .map(this.extractData)
  //       .catch(this.handleError)

  // }

  // getTodayPatient(){
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers,withCredentials: true});

  //   return this.http.get("http://server.hms.com/api/test-booking", options)
  //       .map(this.extractData)
  //       .catch(this.handleError)

  // }

  // getDepartment(){
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers,withCredentials: true});

  //   return this.http.get("http://server.hms.com/api/test-booking", options)
  //       .map(this.extractData)
  //       .catch(this.handleError)
    
  // }

  private extractData(res: Response) {
    let response = res.json();
    return response || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
