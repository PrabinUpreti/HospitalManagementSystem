import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class UserService {
constructor() {}
//User Authentication storage
private static loggedIn:boolean = false;
public static setLoggedInStatus(status){
    UserService.loggedIn = status
}
public static getLoggedInStatus(){
  return UserService.loggedIn
  }
}
