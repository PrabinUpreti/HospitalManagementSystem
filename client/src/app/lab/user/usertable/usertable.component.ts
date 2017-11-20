      import { Component, OnInit,Input } from '@angular/core';
      import { FormControl,FormArray,FormGroup, Validators, FormBuilder} from '@angular/forms'
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
      public MenuArray=[];
      public Menu=[]
      public SelectMenu=[];
      public ModefyUser:FormGroup;
      public  tempArray=[]
      public Menulists=[];
      public Access_MenusList=[];
      public intermediateArray=[];
      public Notify = false;
      public notify;
      public Delete = false;
      public delte;
      
      

      @Input() set InputUserData(data) {
        this.InsertData(data)
      }
      @Input() set InputMenu(menu) {
        this.menuItem(menu)
      }
      constructor(private user:UserroleService,private fb:FormBuilder) { 
        // this.ModefyUser= new FormGroup({
        //   User_name:new FormControl('', [
        //     Validators.required,
        //     Validators.minLength(3),
        //   ]),
        //   email:new FormControl('', [
        //     Validators.required,
        //     Validators.minLength(3),
        //   ]),
        // });
      }
      get Lists(): FormArray {
        return this.ModefyUser.get('Lists') as FormArray;
      };
        ngOnInit() {
          this.initializeapp();
            }
          initializeapp(){
              this.userdata = [];
              this.Menulists = [];
              this.user.getUser().subscribe(
                menus => {
                  this.userdata = menus
                  //console.log('User data',this.userdata)
                  // //console.log('menu User',this.userdata.user[1].access[0].menu_id)
                  });

                this.user.getReport().subscribe(
                    menus =>{
                        this.Menulists=menus.menu;
                        //console.log('menu',this.Menulists)
                        for(let x of this.Menulists) { 
                          // for(let y of this.Access_MenusList ){
                                // if(x.id == y.menu_id){
                                this.MenuArray.push(this.fb.group({
                                  selected: true,
                                  name: x.name,
                                  id: x.id
                                }));
                              } 
                              //  else{
                              //    //console.log('false')
                              //    this.MenuArray.push(this.fb.group({
                              //      selected: false,
                              //      name: x.name,
                              //      id: x.id
                              //  }));
                              //  }
                          // }
                    //  }
                      this.ModefyUser = this.fb.group({
                        'User_name':[null,Validators.required],
                        'email': [null,Validators.required],
                         'status':[null,Validators.required],
                                Lists:this.fb.array(this.MenuArray)
                      });

                    });
                }
          menuItem(menu){
        
          }

        userUpdate(index){
          //console.log(index);
          this.MenuArray=[];
          this.idForUpdatecheck=index;
          this.idForUpdate=this.userdata.user[index].id;
          // this.ModefyUser.controls.User_name.setValue(this.userdata.user[index].name)
          // this.ModefyUser.controls.email.setValue(this.userdata.user[index].email)
          // this.ModefyUser.controls.status.setValue(this.userdata.user[index].status)
          this.Access_MenusList=this.userdata.user[index].access;
          //console.log('Before access',this.Access_MenusList);
        
          let flag:boolean;
          for(let x of this.Menulists) { 
            flag = false;
            for(let y of this.Access_MenusList ){
                  if(x.id == y.menu_id){
                    flag = true;
                    //console.log('true')
                    break;
                  }
            }
            if(flag) {
              this.MenuArray.push(this.fb.group({
                selected: true,
                name: x.name,
                id: x.id
              }));
            }
            else{
              //console.log('false')
              this.MenuArray.push(this.fb.group({
                selected: false,
                name: x.name,
                id: x.id
            }));
          }
      }
      //console.log('checked',this.userdata.user[index].status)
      let checked = this.userdata.user[index].status;
      if(checked == 0){
        this.ModefyUser = this.fb.group({
          'User_name':[this.userdata.user[index].name,Validators.required],
          'email': [this.userdata.user[index].email,Validators.required],
           'status':[0,Validators.required],
                   Lists:this.fb.array(this.MenuArray)
        });
      }
      else{
        this.ModefyUser = this.fb.group({
          'User_name':[this.userdata.user[index].name,Validators.required],
          'email': [this.userdata.user[index].email,Validators.required],
           'status':[1,Validators.required],
                   Lists:this.fb.array(this.MenuArray)
        });
      }
        
          //console.log(this.ModefyUser.value)
          //console.log('After access',this.Access_MenusList);
        }


        UpdateUser(){
          if(this.ModefyUser.valid){
            let FormData;
            FormData=this.ModefyUser.value;
            //console.log('User Id',FormData)
            //console.log(this.idForUpdate)
            FormData['id']=this.idForUpdate;
            this.SelectMenu = FormData.Lists.filter(x => x.selected).map(x => { return { name: x.name, id: x.id, user_id: 0 }; });
            //console.log('Form Data',FormData);
            //console.log('Form After Data',this.SelectMenu);
            this.user.Updatedata(FormData).subscribe(
              response=>{ 
                //console.log('Respose after Edit',response);
                for(let x in this.userdata.user){
                  if(x == this.idForUpdatecheck){
                      this.userdata.user[x].name=response.name;
                      this.userdata.user[x].email=response.email;
                  }
                }
              });
      
            for(let i in this.SelectMenu){
              this.SelectMenu[i].user_id=this.idForUpdate;
            }
          this.user.EditMenu(this.SelectMenu).subscribe(
                response=>{
                     //console.log(response); 
                     this.initializeapp();
                     this.Notify=true;
                     this.notify=response
                     setTimeout(function() {
                      this.Notify = false;
                   }.bind(this), 3000);
            },
            (error)=>
            {
              this.Notify=true;
                this.notify="Unable to Edit User";
                setTimeout(function() {
                  this.Notify = false;
               }.bind(this), 3000);
            }
          );
             
          }
        }
        configDelete(index){
          this.idForDeleteUser=index;
        }
        deletUser(){ 
          this.User_id=this.userdata.user[this.idForDeleteUser].id;
          this.user.DeleteUser(this.User_id).subscribe(
            response=>{
              //console.log(response)
              if(response == this.User_id){
                this.userdata.user.splice(this.idForDeleteUser,1);
                this.initializeapp()
                this.Delete=true;
                this.delte="Sucessfully Delete User!";
                setTimeout(function() {
                   this.Delete = false;
                }.bind(this), 3000);
              }
            },
            (error)=>{
                this.Delete=true;
                this.delte="Unable to  Delete User!";
                setTimeout(function() {
                   this.Delete = false;
               }.bind(this), 3000);
            }
          )
        }
        InsertData(data){
          if(data === undefined) return 0
            //  //console.log('my data',data)
            //  //console.log('Zero index',data[0])
            // this.userdata.user.push(data[0])
            this.initializeapp();
        }
   datadismis(){
          setTimeout(function () {
            this.Notify = false;
          }.bind(this), 3000);  
        }
      }
