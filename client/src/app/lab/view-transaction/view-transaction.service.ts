import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { ENV } from './../../env'

@Injectable()
export class ViewTransactionService {

  constructor( private http:Http, private router:Router) { }

  getpatient(){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(ENV.Request_URL+"/api/view-transaction", options)
      .map(this.extractData)
      .catch(this.handleError)
      .retry(3);
  }

  getpatientFromDate(param){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    console.log(param)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(ENV.Request_URL+"/api/view-transaction", param, options)
      .map(this.extractData)
      .catch(this.handleError)
      .retry(3);
  }
  
    getInvoicesFromDate(param){
            let checkSection = ENV.setSection()
            if(checkSection == "sessionExpired"){
              this.router.navigate(['/']);            
            }
      console.log(param)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.post(ENV.Request_URL+"/api/view-transaction-inv", param, options)
        .map(this.extractData)
        .catch(this.handleError)
        .retry(3);
    }


  getPatientInvoiceFromServer(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(ENV.Request_URL+"/api/view-transactionInv/"+id, options)
      .map(this.extractData)
      .catch(this.handleError)
      .retry(3);
  }
  getPatientLedgerFromServer(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, withCredentials: true });
  return this.http.get(ENV.Request_URL+"/api/view-transactionPl/"+id, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
  }

  getAllPatientLedgerFromServer(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(ENV.Request_URL+"/api/view-transactionAllPl/"+id, options)
      .map(this.extractData)
      .catch(this.handleError)
      .retry(3);
  }
  searchpatientbyName(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(ENV.Request_URL+"/api/search-by-name/"+id, options)
      .map(this.extractData)
      .catch(this.handleError)
      .retry(3);
  }


  searchInvoicesbyName(id){
    let checkSection = ENV.setSection()
    if(checkSection == "sessionExpired"){
      this.router.navigate(['/']);            
    }
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers, withCredentials: true });
return this.http.get(ENV.Request_URL+"/api/search-by-name-inv/"+id, options)
.map(this.extractData)
.catch(this.handleError)
.retry(3);
}

  getAllInvoices(param) {
    let checkSection = ENV.setSection()
    if (checkSection == "sessionExpired") {
      this.router.navigate(['/']);
    }
    console.log(param)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(ENV.Request_URL + "/api/getAllInvoices", param, options)
      .map(this.extractData)
      .catch(this.handleError)
      .retry(3);
  }
  updatePrint(id){
    let checkSection = ENV.setSection()
    if (checkSection == "sessionExpired") {
      this.router.navigate(['/']);
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(ENV.Request_URL + "/api/updatePrint", id, options)
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
