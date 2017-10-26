import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DoctorReportService {

  constructor(private http_:Http) { }


  
  //   console.log(param)
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers, withCredentials: true});
  //   return this.http.get("http://server.hms.com/api/doctor/"+param, options)
  //   .map(this.extractData)
  //   .catch(this.handleError);
  // }

  getDoctorTestbookingTransaction(param){
    console.log(param);
    // let id = param.doctorId;
    let url = "http://server.hms.com/api/getDoctorReportDatas";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.http_.post(url, param, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }


  private extractData(res: Response) {
    let response = res.json();
    return response || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
