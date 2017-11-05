import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import  { ENV } from "../../env";

@Injectable()
export class DashboardService {

  constructor(private http:Http, private router:Router) { }

  getPatient(){
    let checkSection = ENV.setSection()
    if(checkSection == "sessionExpired"){
      this.router.navigate(['/']);            
    }
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});

    return this.http.get(ENV.Request_URL+"/api/dashboard", options)
        .map(this.extractData)
        .catch(this.handleError)
        .retry(10);

  }

  // getDoctor(){
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers,withCredentials: true});

  //   return this.http.get(ENV.Request_URL+"/api/test-booking", options)
  //       .map(this.extractData)
  //       .catch(this.handleError)

  // }

  // getTodayPatient(){
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers,withCredentials: true});

  //   return this.http.get(ENV.Request_URL+"/api/test-booking", options)
  //       .map(this.extractData)
  //       .catch(this.handleError)

  // }

  // getDepartment(){
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers,withCredentials: true});

  //   return this.http.get(ENV.Request_URL+"/api/test-booking", options)
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
