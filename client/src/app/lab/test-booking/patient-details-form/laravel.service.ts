import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import  { ENV } from "../../../env";

@Injectable()
export class LaravelService {

  constructor(private http: Http, private router:Router) { }

  getData(paramData){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
  	
          paramData['createdBy'] = ENV.userName;
          paramData['updatedBy'] = ENV.userName;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});

    return this.http.post(ENV.Request_URL+"/api/test-booking", paramData, options)
        .map(this.extractData)
        .catch(this.handleError)
        .retry(3);
  }

  UpdateData(allDatas){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
          allDatas['createdBy'] = ENV.userName;
          allDatas['updatedBy'] = ENV.userName;
    let id = allDatas.idToUpdate;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});

    return this.http.put(ENV.Request_URL+"/api/test-booking/" + id, allDatas, options)
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
