import { Injectable } from '@angular/core';
import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router'
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserroleService {
  private time;
  private meantime;
  private timecal;
  private cal;
constructor(private _http:Http,private router:Router){}

getReport(){
  var ed = new Date();
  var time=ed.getHours();
  console.log(time);
  this.cal = localStorage.getItem("keyTime");
   if(time - this.cal== 1){
       this.router.navigate(['/']);  
   }else{
      localStorage.setItem("keyTime", JSON.stringify(time))
   }

    return this._http.get("http://server.hms.com/api/menu")
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: Response | any) => {
      return Observable.throw(error);
    });
  }

  getUser(){
    var ed = new Date();
    var time=ed.getHours();
    console.log(time);
    this.cal = localStorage.getItem("keyTime");
     if(time - this.cal== 1){
         this.router.navigate(['/']);  
     }else{
        localStorage.setItem("keyTime", JSON.stringify(time))
     }

    return this._http.get("http://server.hms.com/api/user")
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: Response | any) => {
      return Observable.throw(error);
    });
  }
  Useradd(data: any): Observable<any> {
    var ed = new Date();
    var time=ed.getHours();
    console.log(time);
    this.cal = localStorage.getItem("keyTime");
     if(time - this.cal== 1){
         this.router.navigate(['/']);  
     }else{
        localStorage.setItem("keyTime", JSON.stringify(time))
     }

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this._http.post("http://server.hms.com/api/adduser", data, options)
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

    var ed = new Date();
    var time=ed.getHours();
    console.log(time);
    this.cal = localStorage.getItem("keyTime");
     if(time - this.cal== 1){
         this.router.navigate(['/']);  
     }else{
        localStorage.setItem("keyTime", JSON.stringify(time))
     }

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this._http.post("http://server.hms.com/api/access_menu", Data, options)
    .map(this.extractData)
    .catch(this.handleError);
  }   
  Updatedata(FormData){
    var ed = new Date();
    var time=ed.getHours();
    console.log(time);
    this.cal = localStorage.getItem("keyTime");
     if(time - this.cal== 1){
         this.router.navigate(['/']);  
     }else{
        localStorage.setItem("keyTime", JSON.stringify(time))
     }

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    let id =  FormData.id;
    console.log(id);
    return this._http.post("http://server.hms.com/api/edituser/"+id, FormData, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  DeleteUser(id){
    var ed = new Date();
    var time=ed.getHours();
    console.log(time);
    this.cal = localStorage.getItem("keyTime");
     if(time - this.cal== 1){
         this.router.navigate(['/']);  
     }else{
        localStorage.setItem("keyTime", JSON.stringify(time))
     }
     
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this._http.post("http://server.hms.com/api/deleteuser/"+id,options)
    .map(this.extractData)
    .catch(this.handleError);
  }
}

