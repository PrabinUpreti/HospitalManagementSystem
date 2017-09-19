import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class ReportService {
constructor(private _http: Http) { }
getReportData(id){
      let headers =new Headers({'Content-type':'application/json'});
      let option = new RequestOptions({headers: headers, withCredentials: true});
      return this._http.get("http://server.hms.com/api/report/"+id, option)
      .map((res: Response) => {
        return res.json();
      })
       .catch((error: Response | any) => {
        return Observable.throw(error);
    });
}
getReport(){
     return this._http.get("http://server.hms.com/api/reportdata")
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
  return this._http.post("http://server.hms.com/api/reports", paramData , option)
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
}
