import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()

@Injectable()
export class TransactionService {

constructor(private _http: Http) { }
getbillData(id){
      let headers =new Headers({'Content-type':'application/json'});
      let option = new RequestOptions({headers: headers, withCredentials: true});
      return this._http.get("http://server.hms.com/api/bill/"+id, option)
      .map((res: Response) => {
        return res.json();
      })
       .catch((error: Response | any) => {
        return Observable.throw(error);
    });
}
}
