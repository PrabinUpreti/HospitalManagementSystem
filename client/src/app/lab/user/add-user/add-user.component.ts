import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserroleService } from '../userrole.service';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
      @Component({
        selector: 'app-add-user',
        templateUrl: './add-user.component.html',
        styleUrls: ['./add-user.component.css']
      })
    export class AddUserComponent implements OnInit {    
    private menus=[];
    public SelectMenu=[];
    public Info=[];
    private MenuArray = [];
    private addUser: FormGroup;
    constructor(private userService: UserroleService, private fb:FormBuilder) {

 }
    @Output() UserData = new EventEmitter<any>();
    get menuLists(): FormArray {
        return this.addUser.get('menuLists') as FormArray;
    };
    private responseData = null;
    private SelectedMenuItem=[];
      ngOnInit() {
          this.userService.getReport().subscribe(
            menus => {
              this.menus = menus
              for(let x of menus.menu) {
                this.MenuArray.push(this.fb.group({
                    selected: false,
                    name: x.name,
                    id: x.id
                }));
            }
              this.addUser = this.fb.group({
                  'name':[null,Validators.required],
                  'email': [null,Validators.required],
                  'password':[null,Validators.required],
                  'status':[null,Validators.required],
                           menuLists:this.fb.array(this.MenuArray)
                 });
             });       
          } 
    public Onsubmit(data: any):void{
           let items = this.addUser.value;  
           this.SelectMenu = items.menuLists.filter(x => x.selected).map(x => { return { name: x.name, id: x.id, user_id: 0 }; });
           console.log(this.SelectMenu);
           if(this.addUser.valid){
           this.userService.Useradd(items)
           .subscribe(
               (response)=> {
                console.log('Select Menu', response);
                console.log(response)
                this.UserData.emit(response)
                let user_id= response[0].id;
                console.log('I am new',user_id)
                console.log('User ID : ', user_id);
                for(let x in this.SelectMenu){
                    this.SelectMenu[x].user_id = user_id;
                    }
                //  this.SelectedMenuItem.push(response,this.SelectMenu);
                  console.log('After push', this.SelectMenu);
                 this.userService.access_menu(this.SelectMenu).subscribe(
                   (response)=>{
                   }
                 )
               },
               error => {
                (error)= 'crendential didnt match';
         });
       } 
    }
  }




