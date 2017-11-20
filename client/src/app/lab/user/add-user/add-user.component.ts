import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserroleService } from '../userrole.service';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
      @Component({
        selector: 'app-add-user',
        templateUrl: './add-user.component.html',
        styleUrls: ['./add-user.component.css']
      })
    export class AddUserComponent implements OnInit {    
    public menus=[];
    public SelectMenu=[];
    public Info=[];
    public MenuArray = [];
    public addUser: FormGroup;
    public submit=false;
    public Submit = "Submit";
    public Notify = false;
    public notify;
    constructor(private userService: UserroleService, private fb:FormBuilder) {

 }
    @Output() UserData = new EventEmitter<any>();
    @Output() Menus = new EventEmitter<any>();
    get menuLists(): FormArray {
        return this.addUser.get('menuLists') as FormArray;
    };
    public responseData = null;
    public SelectedMenuItem=[];
      ngOnInit() {
          this.userService.getReport().subscribe(
            menus => {
              this.menus = menus
              this.Menus.emit(this.menus)
              for(let x of menus.menu) {
                this.MenuArray.push(this.fb.group({
                    selected: false,
                    name: x.name,
                    id: x.id
                }));
            }
              this.addUser = this.fb.group({
                  'name':[null,Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
                  'email': [null,Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")],
                  'password':[null,Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
                  'status':[1,Validators.required],
                           menuLists:this.fb.array(this.MenuArray)
                 });
             });       
          } 
    public Onsubmit(data: any):void{
      if(this.addUser.valid){
           this.Submit="Submitting..."
           this.submit=true;
           let items = this.addUser.value;  
           this.SelectMenu = items.menuLists.filter(x => x.selected).map(x => { return { name: x.name, id: x.id, user_id: 0 }; });
           //console.log(this.SelectMenu);
           if(this.addUser.valid){
           this.userService.Useradd(items)
           .subscribe(
               (response)=> {
                //console.log('Select Menu', response);
                //console.log(response)
                
                let user_id= response[0].id;
                //console.log('I am new',user_id)
                //console.log('User ID : ', user_id);
                for(let x in this.SelectMenu){
                    this.SelectMenu[x].user_id = user_id;
                    }
                //  this.SelectedMenuItem.push(response,this.SelectMenu);
                  //console.log('After push', this.SelectMenu);
                 this.userService.access_menu(this.SelectMenu).subscribe(
                   (response)=>{
                    this.UserData.emit(response)
                    this.Submit = "Submit";
                    this.submit = false;
                    this.notify = "User Submitted!";
                    this.Notify = true;
                    setTimeout(function() {
                      this.Notify = false;
                  }.bind(this), 3000);
                   },
                      (error) => {
                          this.Submit = "Submit";
                          this.submit = false;
                          this.notify = "please! Select Access Menus!!";
                          this.Notify = true;
                          setTimeout(function() {
                              this.Notify = false;
                          }.bind(this), 3000);
                   }
                 )
               },
               error => {
                (error)= 'crendential didnt match';
            }
         );
       } 
    }
  }
}




