import { Injectable } from '@angular/core'
import { Headers,Http,Response} from '@angular/http';
import { RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import  { ENV } from "./../env";

@Injectable()
export class LoginService {
private time;
private meantime;
private timecal;
private cal;
constructor(private _http: Http,private router:Router) {} 
private oauthUrl = "http://server.hms.com/oauth/token";
private usersUrl = "http://server.hms.com/api/user"

login(data: any): Observable<any>{
        var ed = new Date();
        var time=ed.getHours();
        localStorage.setItem("keyTime",JSON.stringify(time));

        var user_email=data.email;
        var user_password=data.password;
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        
        let postData={
                grant_type: "password",
                client_id: 2,
                client_secret:"hcDyQGvc9wXO8y8CAuUwZyJJTUKf4n5TBHvNA2nx",
                username: user_email ,
                password: user_password,
            }

        return this._http.post(this.oauthUrl,JSON.stringify(postData),{
        headers:headers})
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
  Userdata(accessToken: any): Observable<any> {
    var headers = new Headers({
        "Accept": "application/json",
        "Authorization": "Bearer " + accessToken,
    });
    return this._http.get(this.usersUrl, { headers: headers })
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
           }  
 LoginId(id:any):Observable<any>{
     let headers = new Headers({'Content-Type': 'application/json'});
     let options = new RequestOptions({headers: headers, withCredentials: true});

     return this._http.get("http://server.hms.com/api/menubar/"+id, options)
    .map(this.extractData)
    .catch(this.handleError);
             } 
       }