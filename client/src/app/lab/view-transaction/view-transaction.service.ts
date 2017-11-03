import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ViewTransactionService {

  constructor( private http:Http) { }

  getpatient(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get("http://server.hms.com/api/view-transaction", options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getpatientFromDate(param){
    console.log(param)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post("http://server.hms.com/api/view-transaction", param, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getPatientInvoiceFromServer(id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get("http://server.hms.com/api/view-transactionInv/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getPatientLedgerFromServer(id){
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.http.get("http://server.hms.com/api/view-transactionPl/"+id, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getAllPatientLedgerFromServer(id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get("http://server.hms.com/api/view-transactionAllPl/"+id, options)
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
