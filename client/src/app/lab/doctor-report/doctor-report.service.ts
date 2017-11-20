import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import  { ENV } from "../../env";

@Injectable()
export class DoctorReportService {

  constructor(private http_:Http, private router:Router) { }


  
  //   //console.log(param)
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers, withCredentials: true});
  //   return this.http.get(ENV.Request_URL+"/api/doctor/"+param, options)
  //   .map(this.extractData)
  //   .catch(this.handleError);
  // }

  getDoctorTestbookingTransaction(param){
    let checkSection = ENV.setSection()
    if(checkSection == "sessionExpired"){
      this.router.navigate(['/']);            
    }
    //console.log(param);
    // let id = param.doctorId;
    let url = ENV.Request_URL+"/api/getDoctorReportDatas";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.http_.post(url, param, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
  }


  private extractData(res: Response) {
    let response = res.json();
    return response || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
