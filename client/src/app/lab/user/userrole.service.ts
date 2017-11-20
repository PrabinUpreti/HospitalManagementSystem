import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router'
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import  { ENV } from "../../env";

@Injectable()
export class UserroleService {
constructor(private _http:Http,private router:Router){}

getReport(){
  let checkSection = ENV.setSection()
  if(checkSection == "sessionExpired"){
    this.router.navigate(['/']);            
  }

    return this._http.get(ENV.Request_URL+"/api/menu")
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: Response | any) => {
      return Observable.throw(error);
    });
  }

  getUser(){
    let checkSection = ENV.setSection()
    if(checkSection == "sessionExpired"){
      this.router.navigate(['/']);            
    }

    return this._http.get(ENV.Request_URL+"/api/user")
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: Response | any) => {
      return Observable.throw(error);
    });
  }
  Useradd(data: any): Observable<any> {
    let checkSection = ENV.setSection()
    if(checkSection == "sessionExpired"){
      this.router.navigate(['/']);            
    }

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this._http.post(ENV.Request_URL+"/api/adduser", data, options)
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

  access_menu(Data){
    let checkSection = ENV.setSection()
    if(checkSection == "sessionExpired"){
      this.router.navigate(['/']);            
    }

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this._http.post(ENV.Request_URL+"/api/access_menu", Data, options)
    .map(this.extractData)
    .catch(this.handleError);
  }   
  Updatedata(FormData){
    let checkSection = ENV.setSection()
    if(checkSection == "sessionExpired"){
      this.router.navigate(['/']);            
    }

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    let id =  FormData.id;
    //console.log(id);
    return this._http.post(ENV.Request_URL+"/api/edituser/"+id, FormData, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  DeleteUser(id){
    let checkSection = ENV.setSection()
    if(checkSection == "sessionExpired"){
      this.router.navigate(['/']);            
    }
     
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this._http.post(ENV.Request_URL+"/api/deleteuser/"+id,options)
    .map(this.extractData)
    .catch(this.handleError);
  }


  EditMenu(menus: any): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});

    return this._http.post(ENV.Request_URL+"/api/editmenu", menus)
    .map(this.extractData)
    .catch(this.handleError);
  }
}

