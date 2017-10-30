import { Component, OnInit,OnDestroy, Input,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { ModifyService } from './../modify.service';
declare var jQuery:any;
@Component({
  selector: 'app-modify-test',
  templateUrl: './modify-test.component.html',
  styleUrls: ['./modify-test.component.css']
})
export class ModifyTestComponent implements OnInit, OnDestroy { 
  public ServeId;
  public selectedTestType;
  @Output() reloadDepartment = new EventEmitter<any>();
  @Output() backToTestType = new EventEmitter<any>();
  @Input() set processTest(id){
    this.ServeId = id[0].id;
    this.selectedTestType = id[0].name;
    console.log(this.ServeId);
    // this.processTestType(id)
  }
  constructor(private modifyService: ModifyService) { }
  
  public showDeleteBlock:boolean;
  public showFormBlock:boolean;
  public showAddBtn:boolean;
  public showUpdateBtn:boolean;
  public showDeleteBtn:boolean;
  public showAddDetailsBtn:boolean;
  public showUpdateDetailsBtn:boolean;
  public showDeleteDetailsBtn:boolean;
  public deleteRemark:string;
  public add:boolean = true;
  public Add:string = "Add";
  public update:boolean = true;
  public Update:string = "Update";
  public addDetails:boolean = true;
  public AddDetails:string = "Add";
  public updateDetails:boolean = true;
  public UpdateDetails:string = "Update"
  public fullTestSection = true;
  public showTestDetails = false;
  public idForEditTestdetials;
  public activeRow;

  public addTest = false;
  public showTest = true;
  public title:string = "Add Test";
  public titleAction:string = "Test List";
  public addBotton = true;
  // public functions = "modefyTestTypes";
  public Notify = false;
  public notify;
  public idForUpdate;
  public idForClientUpdate;
  public idForClientDelete;
  public idForDelete
  public idToSaveTestDetails;
  public responseDatas:any;
  public testDetailDatas:any;
  public age_groupInDropdown = [];
  public Age_groupAfterFilter = [];
  public genderInDropdowns = [];
  public commoncodes = [];
  public tempAgeGroup = [];
  public FormUnits = [];
  public disableFieldInEditMood = false;
  // public TestTypeLists = [];

  public modefyTest: FormGroup;
  public testDetails: FormGroup;
  public getTestWatchMan:any;

  ngOnInit() {
    let id = this.ServeId;
    console.log(id);
    if(this.responseDatas == undefined){
      this.getTestWatchMan = this.modifyService.getTest(id) .subscribe(
        (response)=>{
          if(response.length == 0){
            this.notify = "There is no any Data ";
            this.Notify = true;
            this.notifyDismiss();
          }
          console.log(response);
          this.responseDatas = response;
        },
        (error)=>{
            console.log("sorry error in server")
            this.notify = "sorry error in server !";
            this.Notify = true;
            this.notifyDismiss();
        });
      }
      // if(this.genderInDropdowns == undefined){
        this.modifyService.commoncodes() .subscribe(
          (response)=>{
            if(response.length == 0){              
            this.notify = "There is no any Data ";
            this.Notify = true;
            this.notifyDismiss();
            }
            console.log(response);
            this.commoncodes = response;


            for(let x in response){
              if(response[x].common_code.toUpperCase() == 'GEN'){
                if(this.genderInDropdowns == undefined){
                  this.genderInDropdowns = response[x].common_description;
                }
                else{
                  this.genderInDropdowns.push(response[x].common_description);
                }
              }
            }



            for(let x in response){
              if(response[x].common_code.toUpperCase() == 'UNIT'){
                if(this.FormUnits == undefined){
                  this.FormUnits = response[x].common_description;
                }
                else{
                  this.FormUnits.push(response[x].common_description);
                }
              }
            }



            let tempData;
            for(let x in response){
              if(response[x].common_code.toUpperCase() == 'AGP'){
                if(tempData == undefined){
                  tempData = [
                    {age_group:response[x].common_description, enable:1},
                  ]
                  // this.age_groupInDropdown = response[x].common_description;
                }
                else{
                  tempData.push({age_group:response[x].common_description, enable:1})
                  // this.age_groupInDropdown.push(response[x].common_description);
                }
              }
              this.age_groupInDropdown = tempData;
            }



            
            console.log(this.FormUnits , this.genderInDropdowns, this.age_groupInDropdown)
          },
          (error)=>{
              console.log("sorry error in server")
              this.notify = "sorry error in server !";
              this.Notify = true;
              this.notifyDismiss();
          });
        // }



    this.modefyTest = new FormGroup({
      // selectTestType:new FormControl('', [
      //   Validators.required,
      // ]),
      TestName:new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      TestDescription:new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

    });
    this.testDetails = new FormGroup({
      age:new FormControl('', [
        Validators.required
      ]),
      gender:new FormControl('', [
        Validators.required
      ]),
      lbound:new FormControl('', [
        Validators.required,
        Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"),
      ]),
      ubound:new FormControl('', [
        Validators.required,
        Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"),
      ]),
      unit:new FormControl('', [
        Validators.required,
      ]),
      rate:new FormControl('', [
        Validators.required,
        Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"),
      ]),
    });
  }


  showModalToAdd(){
    this.modefyTest.reset();
    this.add = true;
    this.Add = "Add";
    this.showAddBtn = true;
    this.showDeleteBtn = false;
    this.showUpdateBtn = false;
    this.showFormBlock = true;
    this.showDeleteBlock = false;
    this.title = "Add Test";

    // this.modifyService.getTestType(5).subscribe(
    //   (response)=>{
    //     this.TestTypeLists = response;
    //   },
    //   (error)=>{
    //     console.log("sorry no Test Type");
    //   });
  
    // if(this.showTest){
    //   this.showTest = false;
    //   this.title = "View Test";
    //   this.titleAction = "Add Test";
    //   this.addBotton = true;
    //   this.modefyTest.controls.TestName.setValue(null);
    //   this.modefyTest.controls.TestDescription.setValue(null);
    //   // this.functions = "modefyTestTypes";
    // }
    // else{
    //   this.showTest = true;
    //   this.title = "Add Test";
    //   this.titleAction = "Test List";
    // }
  }
  
  addTests(){
    if(this.modefyTest.valid){
      this.Add = "Adding..."
      this.add = false;
      let TestData = this.modefyTest.value;
      TestData['selecttesttype']=this.ServeId;
      console.log(TestData);
      this.modifyService.pushTest(TestData)
      .subscribe(
        (response)=>{
          // jQuery("#TestModal").modal("hide");
          
          this.Add = "Add"
          this.add = true;
          this.responseDatas.splice(0,0,response)
          this.modefyTest.reset();
          this.notify = "Successfully Added !";
          this.Notify = true;
          this.notifyDismiss();
        },
        (error)=>{
            console.log("sorry error in server")
            this.notify = "sorry error in server !";
            this.Notify = true;
            this.notifyDismiss();
        });
    // this.showTest=true;
    // this.title = "Add Test";
    // this.titleAction = "Test List";
    }
    else{
      for(let x in this.modefyTest.controls ){
        this.modefyTest.controls[x].markAsTouched();
        this.modefyTest.controls[x].markAsDirty();
        this.notify = "Fill form properly !";
        this.Notify = true;
        this.notifyDismiss();
      }
    }
  }

  editTest(index){
    this.Update = "Update";
    this.update = true;
    this.showAddBtn = false;
    this.showDeleteBtn = false;
    this.showUpdateBtn = true;
    this.showFormBlock = true;
    this.showDeleteBlock = false;
    this.title = "Edit Test";
    this.idForClientUpdate = index;
    this.idForUpdate = this.responseDatas[index].id;
    this.modefyTest.controls.TestName.setValue(this.responseDatas[index].name);
    this.modefyTest.controls.TestDescription.setValue(this.responseDatas[index].description);
  }

  updateTest(){
    if(this.modefyTest.valid){
      this.Update = "Updating.."
      this.update = false;
      let finalData;
      finalData = this.modefyTest.value;
      finalData['id']=this.idForUpdate;
      console.log(finalData);
      this.modifyService.updateTest(finalData)
      .subscribe(
        (response)=>{
          for(let x in this.responseDatas ){
            if(x == this.idForClientUpdate){
              this.responseDatas[x].name = response.name;
              this.responseDatas[x].description =response.description;
            }
            jQuery("#TestModal").modal("hide");
            this.notify = "Successfully Updated !";
            this.Notify = true;
            this.notifyDismiss();
          }
          // this.responseDatas.push(response)
        },
        (error)=>{
            console.log("sorry error in server")
            this.notify = "sorry error in server !";
            this.Notify = true;
            this.notifyDismiss();
        }
      )
        // this.modefyTest.reset();
        // this.showTest=true;
        // this.title = "Add Test";
        // this.titleAction = "Test list";
    }
    else{
      for(let x in this.modefyTest.controls ){
        this.modefyTest.controls[x].markAsTouched();
        this.modefyTest.controls[x].markAsDirty();
        this.notify = "Fill form properly !";
        this.Notify = true;
        this.notifyDismiss();
      }
    }
  }









  configDelete(index){
    this.idForClientDelete = index;
    this.showAddBtn = false;
    this.showDeleteBtn = true;
    this.showUpdateBtn = false;
    this.showFormBlock = false;
    this.showDeleteBlock = true;
    this.title = "Delete Test";
    this.deleteRemark = "Are you sure you want to delete "+this.responseDatas[index].name+" ?"
  }




















  deleteTest(){
    this.idForDelete = this.responseDatas[this.idForClientDelete].id;

    this.modifyService.deleteTest(this.idForDelete)
    .subscribe(
      (response)=>{
          this.responseDatas.splice(this.idForClientDelete,1);
          this.notify = "Successfully Deleted !";
          this.Notify = true;
          this.notifyDismiss();
      },
      (error)=>{
        this.notify = "Sorry you cannot delete "+ this.responseDatas[this.idForClientDelete].name;
        this.Notify = true;
        this.notifyDismiss();
      }
    )
  }
















  configDeleteTestDetials(index){
    let eventCheck = confirm("Are you sure you want to delete ?");
    if(eventCheck){
      this.modifyService.deleteTestDetials(this.testDetailDatas[index].id)
      .subscribe(
        (response)=>{
            this.testDetailDatas.splice(index,1);
            this.notify = "Successfully Deleted !";
            this.Notify = true;
            this.notifyDismiss();
        },
        (error)=>{
          this.notify = "Sorry you cannot delete it";
          this.Notify = true;
          this.notifyDismiss();
        }
      )
    }
  }















  editTestDetials(index){
    this.disableFieldInEditMood = true;
    this.idForEditTestdetials = index;
    this.addDetails = true;
    this.AddDetails = "Update";
    this.showAddDetailsBtn = true;
    this.testDetails.controls.gender.setValue(this.testDetailDatas[index].gender);
    this.testDetails.controls.age.setValue(this.testDetailDatas[index].age_group);
    this.testDetails.controls.lbound.setValue(this.testDetailDatas[index].lower_bound);
    this.testDetails.controls.ubound.setValue(this.testDetailDatas[index].upper_bound);
    this.testDetails.controls.rate.setValue(this.testDetailDatas[index].rate);
    this.testDetails.controls.unit.setValue(this.testDetailDatas[index].unit);
  }







  reload(){
    this.showTestDetails = false;
    this.fullTestSection = true;
    // let packedData = 1;
    // this.reloadDepartment.emit(packedData);
  }







  
    configTestDetails(){
      this.disableFieldInEditMood = false;
      this.addDetails = true;
      this.AddDetails = "Add";
      this.showAddDetailsBtn = true;
      this.testDetails.reset();
      this.testDetails.controls.unit.setValue('');
      this.testDetails.controls.age.setValue('');
      this.testDetails.controls.gender.setValue('');
    }
















    addTestsDetails(){
      if(this.testDetails.valid){



        if(!this.disableFieldInEditMood){
          this.AddDetails = "Adding..."
          this.addDetails = false;
          let TestDetails = this.testDetails.value;
          TestDetails['selectedTest']=this.idToSaveTestDetails;
          console.log(TestDetails);
          this.modifyService.testDetails(TestDetails)
          .subscribe(



            (response)=>{
              this.testDetails.reset();
              this.testDetails.controls.unit.setValue('');
              this.testDetails.controls.age.setValue('');
              this.testDetails.controls.gender.setValue('');
              this.testDetailDatas.splice(0,0,response);
              this.notify = "Successfully Added !";
              this.Notify = true;
              this.notifyDismiss();
              // jQuery("#TestDetails").modal("hide");
                  
              this.AddDetails = "Add"
              this.addDetails = true;
            },




            (error)=>{
                console.log("sorry error in server")
                this.notify = "sorry error in server !";
                this.Notify = true;
                this.notifyDismiss();
            });




        }




        else{
        this.AddDetails = "Updating..."
        this.addDetails = false;
        let TestDetails = this.testDetails.value;
        TestDetails['id']=this.testDetailDatas[this.idForEditTestdetials].id;
        TestDetails['selectedTest']=this.idToSaveTestDetails;
        console.log(TestDetails);
        this.modifyService.testDetailsEdit(TestDetails)
        .subscribe(



          (response)=>{
            console.log(response)
            if (response.length > 0) {
            this.testDetails.reset();
            this.testDetails.controls.unit.setValue('');
            this.testDetails.controls.age.setValue('');
            this.testDetails.controls.gender.setValue('');
            // this.testDetailDatas.splice(this.idForEditTestdetials,1,response);
            this.notify = "Successfully Added !";
            this.Notify = true;
            this.notifyDismiss();
            jQuery("#TestDetails").modal("hide");
            
            

              for (let x in this.testDetailDatas) {



                if (this.testDetailDatas[x].id == this.testDetailDatas[this.idForEditTestdetials].id) {
                  this.testDetailDatas[x].age = response[0].age;
                  this.testDetailDatas[x].gender = response[0].gender;
                  this.testDetailDatas[x].lower_bound = response[0].lbound;
                  this.testDetailDatas[x].upper_bound = response[0].ubound;
                  this.testDetailDatas[x].unit = response[0].unit;
                  this.testDetailDatas[x].rate = response[0].rate;
                  break;
                }



              }




              this.Notify = true;
              this.notify = "SuccessFully Edited";
              this.notifyDismiss();
              this.AddDetails = "Add"
              this.addDetails = true;



            }          

          },
          (error)=>{
              console.log("sorry error in server")
              this.notify = "sorry error in server !";
              this.Notify = true;
              this.notifyDismiss();
          });          
        }
      }
      else{
        console.log("invalid");
        for(let x in this.testDetails.controls ){
          this.testDetails.controls[x].markAsTouched();
          this.testDetails.controls[x].markAsDirty();
          this.notify = "Fill form properly !";
          this.Notify = true;
          this.notifyDismiss();
        }
      }
    }







  
  
    testDetailsForm(id){
      this.activeRow = id;
      this.testDetails.reset();
      this.testDetails.controls.unit.setValue('');
      this.testDetails.controls.age.setValue('');
      this.testDetails.controls.gender.setValue('');
      console.log("this is fullTestSection" + id);
      this.idToSaveTestDetails = this.responseDatas[id].id;
      console.log(this.idToSaveTestDetails);
      this.fullTestSection = false;
      this.showTestDetails = true;
      
      let testDetailsid = this.idToSaveTestDetails;
      console.log(testDetailsid);
        this.modifyService.getTestDetails(testDetailsid) .subscribe(
          (response)=>{
            if(response.length == 0){
              this.notify = "There is no any Data !";
              this.Notify = true;
              this.notifyDismiss();
            }
            this.testDetailDatas = response;
          },
          (error)=>{
              console.log("sorry error in server")
              this.notify = "sorry error in server !";
              this.Notify = true;
              this.notifyDismiss();
          });
    }













    public updateAgeGroup(event){
          let dropDown = []
          for(let i in this.age_groupInDropdown) dropDown.push(JSON.parse(JSON.stringify(this.age_groupInDropdown[i])))
          
          for(let i in dropDown){
            for(let j in this.testDetailDatas){
              if(this.testDetailDatas[j].age_group.toUpperCase() === dropDown[i].age_group.toUpperCase()){
                
                if(event.target.value.toUpperCase()=="MALE")
                if(this.testDetailDatas[j].gender.toUpperCase() == "MALE"){
                  dropDown[i].enable--
                }

                if(event.target.value.toUpperCase()=="FEMALE")
                if(this.testDetailDatas[j].gender.toUpperCase() == "FEMALE"){
                  dropDown[i].enable--
                }
                if(event.target.value.toUpperCase()=="OTHERS")
                if(this.testDetailDatas[j].gender.toUpperCase() == "OTHERS"){
                  dropDown[i].enable--
                }
              }
            }
          }

          let finalDropDown=[]

          for(let i in dropDown){
            if(dropDown[i].enable == 1){
              finalDropDown.push(dropDown[i])
            }
          }
          this.Age_groupAfterFilter = finalDropDown
          console.log(this.Age_groupAfterFilter)

    }











    notifyDismiss() {
      setTimeout(function () {
        this.Notify = false;
      }.bind(this), 3000);
    }








    ngOnDestroy(){
      this.getTestWatchMan.unsubscribe();
      console.log('get test watchman has been unsubscribed')      
    }




  componentBack(){
    this.backToTestType.emit(1)
  }




}
