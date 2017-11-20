import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import  { ENV } from "../../env";

@Injectable()
export class ReportService {
constructor(private _http: Http, private router:Router) { }

getReportData(id){

        let checkSection = ENV.setSection()
        if(checkSection == "sessionExpired"){
          this.router.navigate(['/']);            
        }

        let headers =new Headers({'Content-type':'application/json'});
        let option = new RequestOptions({headers: headers, withCredentials: true});

        return this._http.get(ENV.Request_URL+"/api/report/"+id, option)
        .map((res: Response) => {
          return res.json();
        })
        .catch((error: Response | any) => {
          return Observable.throw(error);
      });
}
getReport(id){
        let data=id;
        let headers =new Headers({'Content-type':'application/json'});
        let option = new RequestOptions({headers: headers, withCredentials: true});
        return this._http.post(ENV.Request_URL+"/api/reportdata", data, option)
        .map((res: Response) => {
          return res.json();
        })
        .catch((error: Response | any) => {
          return Observable.throw(error);
      });
}

getData(paramData){
          let headers =new Headers({'Content-type':'application/json'});
          let option = new RequestOptions({headers: headers, withCredentials: true});
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
          
           return this._http.post(ENV.Request_URL+"/api/reports", paramData , option)
          .map(this.extractData)
          .catch(this.handleError);
            }
          private extractData(res: Response){
          let response = res.json();
          return response ||{};
          }
          private handleError(error: Response | any){
          return Observable.throw(error);
          }
          getInvoice(testbooking_id: any): Observable<any>{
            let headers = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: headers,withCredentials: true});
            return this._http.get(ENV.Request_URL+"/api/getinvoice/"+testbooking_id, options)
           .map(this.extractData)
         }
    }
