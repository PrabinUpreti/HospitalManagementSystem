import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { UserroleService } from '../userrole.service';
@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
public userdata:any;
public responseDatas:any;
public idForUpdate;
public idForUpdatecheck;
public idForDeleteUser;
public User_id;
public user_info=[];
ModefyUser:FormGroup;
public intermediateArray=[];

constructor(private user:UserroleService,private fb:FormBuilder) { 
  this.ModefyUser= new FormGroup({
    User_name:new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email:new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
}

  ngOnInit() {
    this.user.getUser().subscribe(
      menus => {
         this.userdata = menus
        }); 
    }
   userUpdate(index){
     console.log(index);
     this.idForUpdatecheck=index;
     this.idForUpdate=this.userdata.user[index].id;
     this.ModefyUser.controls.User_name.setValue(this.userdata.user[index].name)
     this.ModefyUser.controls.email.setValue(this.userdata.user[index].email)
  }
  UpdateUser(){
    if(this.ModefyUser.valid){
       let FormData;
       FormData=this.ModefyUser.value;
       FormData['id']=this.idForUpdate;
       console.log(FormData);
       this.user.Updatedata(FormData).subscribe(
         response=>{ 
           console.log(response);
           for(let x in this.userdata.user){
             if(x == this.idForUpdatecheck){
                this.userdata.user[x].name=response.name;
                this.userdata.user[x].email=response.email;
             }
           }
         }
       )
    }
  }
  configDelete(index){
    this.idForDeleteUser=index;
  }
  deleteUser(){ 
    this.User_id=this.userdata.user[this.idForDeleteUser].id;
    this.user.DeleteUser(this.User_id).subscribe(
      response=>{
        console.log(response)
        if(response == this.User_id){
          this.userdata.user.splice(this.idForDeleteUser,1);
        }
      }
    )
  }
}
