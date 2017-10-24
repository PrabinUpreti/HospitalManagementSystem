        import { Component, OnInit } from '@angular/core';
        import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
        import { LoginService } from '../login.service';
        import { UserService } from '../user.service';
        import { Router } from '@angular/router';
        import  { ENV } from "../../env";
        @Component({
          selector: 'app-login',
          templateUrl: './login.component.html',
          styleUrls: ['./login.component.css']
        })
        export class LoginComponent implements OnInit {
          // UserForm: FormGroup;
          private loginForm: FormGroup;
        private timevalue;
        private usernice:any;
        constructor(private loginservice: LoginService, private fb: FormBuilder,private router:Router) {
              this.loginForm = fb.group({
                  'email': [null, Validators.required],
                  'password': [null, Validators.required],
            });
            console.log(this.router.url);
         }	
        ngOnInit(){
         
        }
        public submitForm(Data:any):void{
            var e_username = this.loginForm.controls.email.value;
            var e_password = this.loginForm.controls.password.value;
            let postData = this.loginForm.value;
            console.log(postData); 
              this.loginservice.login(postData).subscribe(
                response=>{
                  console.log(response.access_token)
                  if(response.access_token){
                    //Local storage

                    localStorage.setItem("access_token",response.access_token)
                    localStorage.setItem("user",JSON.stringify(response.user))

                    //set authentication user in auth service
                    this.loginservice.Userdata(response.access_token).subscribe(
                      response=>{
                      console.log(response)
                      var id;
                      for(let x in response.user){
                         if(response.user[x].email === e_username){
                            console.log('I ma In',response.user[x].id)
                             id =response.user[x].id;  
                             console.log(id)  
                             break;                   
                           }
                         }   
                         this.loginservice.LoginId(id).subscribe(
                           response =>{
                             console.log('User Menu Item',response.menubar)
                             localStorage.setItem('SelectMenuIten', JSON.stringify(response.menubar));
                             this.usernice=JSON.parse(localStorage.getItem("SelectMenuIten"));
                             console.log(this.usernice)

                             UserService.setLoggedInStatus(true)
                             this.loginForm.reset()
                             this.router.navigate(['/lab']);
                           }
                         )
                      })
                    // UserService.setLoggedInStatus(true)
                    // this.loginForm.reset()
                    // this.router.navigate(['/lab']);
                  }
                },
                error=>{
                  (error)= 'crendential didnt match';
              }); 
            }  
        }
