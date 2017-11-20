import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import  { ENV } from "../../env";
@Injectable()
export class TransactionService {

constructor(private PatientTest: Http, private router:Router) { }
getPatientTest(id) {
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.PatientTest.get(ENV.Request_URL+"/api/transaction/" + id, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
}
getDetialsOfPatients(id) {
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.PatientTest.get(ENV.Request_URL+"/api/transactions/" + id, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
}

postInvoices(param){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
          param['createdBy'] = ENV.userName;
          param['updatedBy'] = ENV.userName;
  //console.log(param)
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.PatientTest.post(ENV.Request_URL+"/api/transaction", param, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
}

getDetialsOfTestbooking(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.PatientTest.get(ENV.Request_URL+"/api/transactionstestbooking/" + id, options)
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