import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ModifyService } from './../modify.service';
declare var jQuery:any;
@Component({
  selector: 'app-modify-dep',
  templateUrl: './modify-dep.component.html',
  styleUrls: ['./modify-dep.component.css']
})
export class ModifyDepComponent implements OnInit {
  @Output() hideDepartment = new EventEmitter<any>();
  constructor(private modifyService: ModifyService) { }
  public addDepartment = false;
  // public showDepartment = true;
  public showDeleteBlock:boolean;
  public showFormBlock:boolean;
  public showAddBtn:boolean;
  public showUpdateBtn:boolean;
  public showDeleteBtn:boolean;
  public deleteRemark:string;
  public add:boolean = true;
  public Add:string = "Add";
  public update:boolean = true;
  public Update:string = "Update";
  public title:string ="Add Department";
  // public titleAction:string = "Department List";
  public Notify = false;
  public notify;
  public addBotton = true;
  public functions = "modefyDepartments";
  public idForUpdate;
  public idForClientUpdate;
  public idForClientDelete;
  public idForDelete;
  public responseDatas:any;
  public editDatas = {};
  public breadcrumbs=[
    {name:'Department', value:''},
    {name:'Test Type', value:'value'},
    {name:'Department', value:'value2'},
  ];

  public modefyDepartment: FormGroup;

  ngOnInit() {
    if(this.responseDatas == undefined){
      this.modifyService.getDepartment() .subscribe(
        (response)=>{
          //console.log(response);
          this.responseDatas = response;
        },
        (error)=>{
          this.notify = "sorry error in server !";
          this.Notify = true;
          this.notifyDismiss();
        });
      }
    this.modefyDepartment = new FormGroup({
      DepartmentName:new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      DepartmentDescription:new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

    });
  }

  showModalToAdd(){
      this.showAddBtn = true;
      this.showDeleteBtn = false;
      this.showUpdateBtn = false;
      this.showFormBlock = true;
      this.showDeleteBlock = false;
      this.title = "Add Department";
      // this.addBotton = true;
      this.modefyDepartment.controls.DepartmentName.setValue(null);
      this.modefyDepartment.controls.DepartmentDescription.setValue(null);
      // this.functions = "modefyDepartments";


    // else{
    //   this.showDepartment = true;
    //   this.title = "Add Department";
    //   this.titleAction = "Department List";
    // }
  }
  
  addDepartments(){
    if(this.modefyDepartment.valid){
      this.add = false;
      this.Add = "Adding...";
      let departmentData = this.modefyDepartment.value;
      //console.log(departmentData);
      this.modifyService.pushDepartment(departmentData)
      .subscribe(
        (response)=>{
          this.modefyDepartment.reset();
          // jQuery("#myModal").modal("hide");
          this.add = true;
          this.Add = "Add";
          this.responseDatas.splice(0,0,response);
          this.notify = "Successfully Added !";
          this.Notify = true;
          this.notifyDismiss();
        },
        (error)=>{
            this.add = true;
            this.Add = "Add";
            //console.log("sorry error in server")
            this.notify = "sorry error in server !";
            this.Notify = true;
            this.notifyDismiss();
        }
    )
    // this.showDepartment=true;
    this.title = "Add Department";
    // this.titleAction = "Department List";
    }
    else{
      for(let x in this.modefyDepartment.controls ){
        this.modefyDepartment.controls[x].markAsTouched();
        this.modefyDepartment.controls[x].markAsDirty();
        this.notify = "Fill Form Properly !";
        this.Notify = true;
        this.notifyDismiss();
      }
    }
  }

  editDepartment(index){
    this.showAddBtn = false;
    this.showDeleteBtn = false;
    this.showUpdateBtn = true;
    this.showFormBlock = true;
    this.showDeleteBlock = false;
    this.title = "Edit Department";
    this.idForClientUpdate = index;
    this.idForUpdate = this.responseDatas[index].id;
    this.modefyDepartment.controls.DepartmentName.setValue(this.responseDatas[index].name);
    this.modefyDepartment.controls.DepartmentDescription.setValue(this.responseDatas[index].description);
  }

  updateDepartment(){
    if(this.modefyDepartment.valid){
      this.update = false;
      this.Update = "Updating..."
      let finalData;
      finalData = this.modefyDepartment.value;
      finalData['id']=this.idForUpdate;
      this.modifyService.updateDepartment(finalData)
      .subscribe(
        (response)=>{
          this.modefyDepartment.reset();
          for(let x in this.responseDatas ){
            if(x == this.idForClientUpdate){
              this.responseDatas[x].name = response.name;
              this.responseDatas[x].description =response.description;
            }
          }
          jQuery("#myModal").modal("hide");
          this.update = true;
          this.Update = "Update";
          // this.responseDatas.push(response)
          this.notify = "Successfully Updated !";
          this.Notify = true;
          this.notifyDismiss();
        },
        (error)=>{
            this.update = true;
            this.Update = "Update";
            //console.log("sorry error in server")
        }
      )
      // this.modifyService.getDepartment() .subscribe(
      //   (response)=>{
      //     this.responseDatas = response;
      //   },
      //   (error)=>{
      //       //console.log("sorry error in server")
      //   });
        // this.showDepartment=true;
        this.title = "Add Department";
        // this.titleAction = "Department list";
    }
    else{
      for(let x in this.modefyDepartment.controls ){
        this.modefyDepartment.controls[x].markAsTouched();
        this.modefyDepartment.controls[x].markAsDirty();
        this.notify = "Fill Form Properly !";
        this.Notify = true;
        this.notifyDismiss();
      }
    }
  }
  configDelete(index){
    //console.log(index);
    this.idForClientDelete = index;
    this.showAddBtn = false;
    this.showDeleteBtn = true;
    this.showUpdateBtn = false;
    this.showFormBlock = false;
    this.showDeleteBlock = true;
    this.title = "Delete Department";
    this.deleteRemark = "Are you Sure You want to delete " +this.responseDatas[index].name+ "?"
  }
  deleteDepartment(){
    this.idForDelete = this.responseDatas[this.idForClientDelete].id;

    this.modifyService.deleteDepartment(this.idForDelete)
    .subscribe(
      (response)=>{
          jQuery("#myModal").modal("hide");
          this.responseDatas.splice(this.idForClientDelete,1);
          this.notify = "Successfully Deleted !";
          this.Notify = true;
          this.notifyDismiss();
      },
      (error)=>{
        //console.log("opps some thing wrong in server");
        this.notify = "sorry You cannot Delete " + this.responseDatas[this.idForClientDelete].name;
        this.Notify = true;
        this.notifyDismiss();
      }
    )
  }

  insideDepartment(index){
    //console.log(index);
    let packedData = [];
    let id = this.responseDatas[index];
    packedData.push(id);
    //console.log(packedData);
    this.hideDepartment.emit(packedData);
  }

  notifyDismiss(){
    setTimeout(function () {
      this.Notify = false;
    }.bind(this), 3000);  
  }

}
