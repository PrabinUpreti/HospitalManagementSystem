import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class TestbookingTransactionService {

  constructor(private PatientTest: Http) { }
  getPatientTestbookingTest(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.PatientTest.get("http://server.hms.com/api/testbooking-transaction/" + id, options)
      .map(this.extractData)
      .catch(this.handleError)
      .retry(10);
  }

  getDetialsOfPatientsTestbooking(id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.PatientTest.get("http://server.hms.com/api/transactionstestbooking/" + id, options)
      .map(this.extractData)
      .catch(this.handleError)
      .retry(10);
  }

  setpatienttransaction(term){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.PatientTest.post("http://server.hms.com/api/postinvoice", term, options)
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
