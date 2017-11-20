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
          public loginForm: FormGroup;
        public timevalue;
        public usernice:any;
        public  login=false;
        public  Login="Login";
        public Notify = false;
        public notify;
        public url;
        constructor(private loginservice: LoginService, private fb: FormBuilder,private router:Router) {
              this.loginForm = fb.group({
                  'email': [null, Validators.required],
                  'password': [null, Validators.required],
            });
            //console.log(this.router.url);
         }	
        ngOnInit(){
         
        }
        public submitForm():void{
            if(this.loginForm.valid){
                this.Login="Login...."
                this.login= true;
            var e_username = this.loginForm.controls.email.value;
            var e_password = this.loginForm.controls.password.value;
            let postData = this.loginForm.value;            
            //console.log(postData);
              this.loginservice.login(postData).subscribe(
                response=>{
                  //console.log(response)
                  if(response.access_token){
                    //Local storage

                    localStorage.setItem("access_token",response.access_token)
                    localStorage.setItem("user",JSON.stringify(response.user))
                    // ENV.userName = response.user.name;

                    //set authentication user in auth service
                    this.loginservice.Userdata(response.access_token).subscribe(
                      response=>{
                      //console.log(response)
                      
                      this.login=false;
                      this.Login="Login"
                      this.Notify=true;
                      this.notify=" User Logged In "
                      var id;
                      for(let x in response.user){
                         if(response.user[x].email === e_username){
                            //console.log('I ma In',response.user[x].id)
                            localStorage.setItem("user",JSON.stringify(response.user[x]))
                            ENV.userName = response.user[x].name;
                             id =response.user[x].id;  
                             //console.log(id)  
                             break;                   
                           }
                         }   
                         this.loginservice.LoginId(id).subscribe(
                           response =>{
                             //console.log('User Menu Item',response.menubar)
                             localStorage.setItem('SelectMenuIten', JSON.stringify(response.menubar));
                             this.url = response.menubar[0].link;
                             this.usernice=JSON.parse(localStorage.getItem("SelectMenuIten"));
                             //console.log(this.usernice)

                             UserService.setLoggedInStatus(true)
                             this.loginForm.reset()
                             this.router.navigate([this.url]);
                           }
                         )
                      })
                      this.loginservice.getHospitalInFo().subscribe(
                        (response)=>{
                          //console.log(response)
                          ENV.hospital = response[0].name;
                          ENV.address = response[0].address;
                          ENV.pan_Number = response[0].pan_no;
                          ENV.phone_number = response[0].phone1;
                          ENV.phone2 = response[0].phone2;
                          ENV.phone3 = response[0].phone3;
                          ENV.phone4 = response[0].phone4;
                          ENV.Request_URL = response[0].request_URL;
                          ENV.RegNo = response[0].reg_no;
                          ENV.established = response[0].established;
                          ENV.website = response[0].website;
                          ENV.email = response[0].email;
                          ENV.country = response[0].country;
                        },
                        (error)=>{
                          this.login = false;
                          this.Login = "Login";
                          this.Notify = true;
                          this.notify = "Something wrong in server ! ";
                        }
                      )
                    // UserService.setLoggedInStatus(true)
                    // this.loginForm.reset()
                    // this.router.navigate(['/lab']);
                  }
                },
               (error)=>{
                  this.login=false;
                  this.Login="Login";
                  this.Notify=true;
                  this.notify="Please! Insert Valid Credential";
                 }
              ); 
          } 
       } 
   }
