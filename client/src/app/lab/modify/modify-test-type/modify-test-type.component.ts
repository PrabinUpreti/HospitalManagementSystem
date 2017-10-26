import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { ModifyService } from './../modify.service';
declare var jQuery:any;

@Component({
  selector: 'app-modify-test-type',
  templateUrl: './modify-test-type.component.html',
  styleUrls: ['./modify-test-type.component.css']
})
export class ModifyTestTypeComponent implements OnInit {
  public ServeId;
  public selectedDepartment;
  @Output() reloadDepartment = new EventEmitter<any>();
  @Output() hideTestType = new EventEmitter<any>();
  @Input() set processTestType(id){
    this.ServeId = id[0].id;
    this.selectedDepartment = id[0].name;
    console.log(this.ServeId);
    // this.processTestType(id)
  }
  constructor(private modifyService: ModifyService) { }

  public notify:string;
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
  public Delete:string = "Delete";
  
  public addTestType = false;
  public showTestType =true;
  public title:string ="Add Test Type";
  // public titleAction:string = "Test Type List";
  public addBotton = true;
  // public functions = "modefyTestTypes";
  public idForUpdate;
  public idForClientUpdate;
  public idForClientDelete;
  public idForDelete
  public responseDatas:any;
  // public departmentLists = [];

  public modefyTestType: FormGroup;

  ngOnInit() {
    let id = this.ServeId;
    console.log(id);
    if(this.responseDatas == undefined){
      this.modifyService.getTestType(id) .subscribe(
        (response)=>{
          this.responseDatas = response;
        },
        (error)=>{
            console.log("sorry error in server")
        });
      }

    this.modefyTestType = new FormGroup({
      // selectdepartment:new FormControl('', [
      //   Validators.required,
      // ]),
      TestTypeName:new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      TestTypeDescription:new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

    });
  }

  showModalToAdd(){
    this.Add = "Add";
    this.add = true;
    this.modefyTestType.reset();
    this.showAddBtn = true;
    this.showDeleteBtn = false;
    this.showUpdateBtn = false;
    this.showFormBlock = true;
    this.showDeleteBlock = false;
    this.title = "Add Test Type";

    // this.modifyService.getDepartment().subscribe(
    //   (response)=>{
    //     this.departmentLists = response;
    //   },
    //   (error)=>{
    //     console.log("sorry no department");
    //   });
  
    // if(this.showTestType){
    //   this.showTestType = false;
    //   this.title = "View Test Types";
      // this.titleAction = "Add Test Types";
      // this.addBotton = true;
      // this.modefyTestType.controls.TestTypeName.setValue(null);
      // this.modefyTestType.controls.TestTypeDescription.setValue(null);
      // this.functions = "modefyTestTypes";
    // }
    // else{
    //   this.showTestType = true;
    //   this.title = "Add Test Types";
    //   // this.titleAction = "Test Type List";
    // }
  }
  
  addTestTypes(){
    if(this.modefyTestType.valid){
      this.Add = "Adding..."
      this.add = false;
      let TestTypeData = this.modefyTestType.value;
      TestTypeData['selectdepartment']=this.ServeId;
      console.log(TestTypeData);
      this.modifyService.pushTestType(TestTypeData)
      .subscribe(
        (response)=>{
          this.modefyTestType.reset();
          // jQuery("#TestTypeModal").modal("hide");
          this.Add = "Add"
          this.add = true;
          this.responseDatas.splice(0,0,response)
        },
        (error)=>{
            console.log("sorry error in server")
        });
    // this.showTestType=true;
    this.title = "Add TestType";
    // this.titleAction = "TestType List";
    }
    else{
      for(let x in this.modefyTestType.controls ){
        this.modefyTestType.controls[x].markAsTouched();
        this.modefyTestType.controls[x].markAsDirty();
      }
      console.log("Opps Something wrong in client");
    }
  }

  editTestType(index){
    // this.titleAction = "Edit Test Types";
    this.Update = "Update";
    this.update = true;
    this.showAddBtn = false;
    this.showDeleteBtn = false;
    this.showUpdateBtn = true;
    this.showFormBlock = true;
    this.showDeleteBlock = false;
    this.title = "Edit Test Type";
    this.idForClientUpdate = index;
    this.idForUpdate = this.responseDatas[index].id;
    this.modefyTestType.controls.TestTypeName.setValue(this.responseDatas[index].name);
    this.modefyTestType.controls.TestTypeDescription.setValue(this.responseDatas[index].description);
  }

  updateTestTypes(){
    if(this.modefyTestType.valid){
      this.Update = "Updating..."
      this.update = false;
      let finalData;
      finalData = this.modefyTestType.value;
      finalData['id']=this.idForUpdate;
      console.log(finalData);
      this.modifyService.updateTestType(finalData)
      .subscribe(
        (response)=>{
          for(let x in this.responseDatas ){
            if(x == this.idForClientUpdate){
              this.responseDatas[x].name = response.name;
              this.responseDatas[x].description =response.description;
            }
            jQuery("#TestTypeModal").modal("hide");
          }
          // this.responseDatas.push(response)
        },
        (error)=>{
            console.log("sorry error in server")
        }
      )
      this.modefyTestType.reset();
      // this.modifyService.getTestType() .subscribe(
      //   (response)=>{
      //     this.responseDatas = response;
      //   },
      //   (error)=>{
      //       console.log("sorry error in server")
      //   });
        // this.showTestType=true;
        this.title = "Add Test Types";
        // this.titleAction = "Test Type list";
    }
    else{
      for(let x in this.modefyTestType.controls ){
        this.modefyTestType.controls[x].markAsTouched();
        this.modefyTestType.controls[x].markAsDirty();
      }
      console.log("Opps Something wrong in client");
    }
  }
  configDelete(index){
    this.showAddBtn = false;
    this.showDeleteBtn = false;
    this.showUpdateBtn = false;
    this.showFormBlock = false;
    this.showDeleteBlock = true;
    this.title = "Delete Test Type";
    this.deleteRemark = "Sorry You Cannot Delete this Right Now!"
  }
  deleteTestType(index){
    this.idForClientDelete = index;
    this.idForDelete = this.responseDatas[index].id;

    this.modifyService.deleteTestType(this.idForDelete)
    .subscribe(
      (response)=>{
        if(response == this.idForDelete){
          this.responseDatas.splice(this.idForClientDelete,1);
        }
      },
      (error)=>{
        console.log("opps some thing wrong in server");
      }
    )
  }
  reload(){
    let packedData = 1;
    this.reloadDepartment.emit(packedData);
  }
  insideTestType(index){
    let packedData = [];
    let id = this.responseDatas[index];
    packedData.push(id);
    console.log(packedData);
    this.hideTestType.emit(packedData);
  }
}
