import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import  { ENV } from "./env";

@Injectable()
export class LaravelService {
  private timevalue;
constructor(private http: Http) {
      this.timevalue=ENV.timeStamp;
      console.log(this.timevalue);
   }

  getData(paramData){
  	
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    // ENV.timeStamp = ed.DateTimeTo.getHours(); 
    return this.http.post("http://server.hms.com/api/test-booking", paramData, options)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) {
    let response = res.json();
    return response || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
