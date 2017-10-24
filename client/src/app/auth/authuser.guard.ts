import { Injectable } from '@angular/core';
import { CanActivate,Router ,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class AuthuserGuard implements CanActivate {

constructor(private user:UserService,private router:Router){}
canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {
   if(UserService.getLoggedInStatus()){
      return true;
   } else{
     this.router.navigate(['/']);
     console.log('U are Not Authenticated')
     return false;
   }
  }
}
