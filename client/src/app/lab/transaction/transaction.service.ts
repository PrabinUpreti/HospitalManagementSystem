import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class TransactionService {

constructor(private PatientTest: Http) { }
getPatientTest(id) {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.PatientTest.get("http://server.hms.com/api/transaction/" + id, options)
    .map(this.extractData)
    .catch(this.handleError);
}
getDetialsOfPatients(id) {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.PatientTest.get("http://server.hms.com/api/transactions/" + id, options)
    .map(this.extractData)
    .catch(this.handleError);
}

postInvoices(param){
  console.log(param)
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.PatientTest.post("http://server.hms.com/api/transaction", param, options)
    .map(this.extractData)
    .catch(this.handleError);
}

getDetialsOfTestbooking(id){
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.PatientTest.get("http://server.hms.com/api/transactionstestbooking/" + id, options)
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