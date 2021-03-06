import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModifyService } from './../../modify/modify.service';
import {IMyDrpOptions} from 'mydaterangepicker';
declare var jQuery:any;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  
  public myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek:'su',
    sunHighlight:false,
    disableHeaderButtons:false,
    // selectorHeight:'500px',
    // selectorWidth:'500px',
    // height:'34px',
    // width:'auto',
    // selectorWidth:'100%',
    // componentDisabled:true,
    editableDateRangeField:false,
    openSelectorOnInputClick:true,
  };



  constructor(
    private ModifyService: ModifyService,private formBuilder: FormBuilder
  ) { }
  public responseDatas = [];
  public patientGroup:FormGroup;
  public myForm: FormGroup;
  public showTable = true;
  public Update = "Update";
  public update = false;
  public genderindrops=[];
  public mrts=[];
  public Notify = false;
  public notify;
  public idForUpdate;
  public searchByName:FormControl;
  ngOnInit() {

    
    this.searchByName = new FormControl()
    this.searchByName.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        if (term.length > 0) {
          this.ModifyService.searchpatientbyName(term)
            .subscribe((response) => {
              if (response) {
                this.responseDatas = response;
              }

            }, (error) => {

            });
        }
        else {
          this.ModifyService.getAllPatient()
            .subscribe(
            response => {
              //console.log(response);
              if (response.length > 0) {
                this.responseDatas = response;
                //console.log(this.responseDatas)
              }
              else {
              }

            },
            error => {
            });
          }
        });

    
    this.myForm = this.formBuilder.group({
      myDateRange: ['', Validators.required],
      selecteddoctor:new FormControl('')
    });


    this.patientGroup = new FormGroup({
      name:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      nationality:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      age:new FormControl('',Validators.required),
      marital_status:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      email:new FormControl('', Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")),

    });

    
    this.ModifyService.getAllPatient()
    .subscribe(
      response=>{
        //console.log(response);
        if(response.length > 0){
            this.responseDatas = response;
            //console.log(this.responseDatas)
          }
          else{
          }

        },
        error=>{
        }
      );


      
      // if(this.genderInDropdowns == undefined){
        this.ModifyService.commoncodes() .subscribe(
          (response)=>{
            if(response.length == 0){
              this.Notify = true;
              this.notify = "There is no any Data ";
              this.notifyDismiss();
            }
            for(let x in response){
              if(response[x].common_code.toUpperCase() == 'GEN'){
                if(this.genderindrops == undefined){
                  this.genderindrops = response[x].common_description;
                }
                else{
                  this.genderindrops.push(response[x].common_description);
                }
              }
            }



            for(let x in response){
              if(response[x].common_code.toUpperCase() == 'MRT'){
                if(this.mrts == undefined){
                  this.mrts = response[x].common_description;
                }
                else{
                  this.mrts.push(response[x].common_description);
                }
              }
            }
            // //console.log(this.FormUnits , this.genderInDropdowns, this.age_groupInDropdown)
          },
          (error)=>{
              //console.log("sorry error in server")
              this.Notify = true;
              this.notify = "Sorry couldn't load data from server please refresh it."
              this.notifyDismiss();
          });
  }

  getPatientByDate(){
    let param={};
    //console.log(this.myForm.controls.myDateRange.value)
    if(this.myForm.controls.myDateRange.value){
      let dateRange = this.myForm.controls.myDateRange.value.formatted.split(' - ');
      param['startDate'] = dateRange[0];
      param['endDate'] = dateRange[1] +" 23:59:59";
      //console.log(param);
      this.ModifyService.getpatientFromDate(param)
      .subscribe(
        (response)=>{
          if(response.length>0){
            //console.log(response)
            this.responseDatas = response;
          }
          else{
            alert("No datas")
            this.Notify = true;
            this.notify = "No Data in Database !"
            this.notifyDismiss();
          }
        },(error)=>{
          
        this.Notify = true;
        this.notify = "Sorry error in server !"
        this.notifyDismiss();
        })
      }
      else{
        this.ModifyService.getAllPatient()
        .subscribe(
          response=>{
            //console.log(response);
            if(response.length > 0){
                this.responseDatas = response;
                //console.log(this.responseDatas)
              }
              else{
              }
    
            },
            error=>{
            }
          );
      }
  }

  setDateRange(): void {
    // Set date range (today) using the setValue function
    let date = new Date();
    this.myForm.setValue({myDateRange: {
        beginDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        },
        endDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }});
}



  editPatient(index){
    this.showTable =false;
    this.patientGroup.controls.name.setValue(this.responseDatas[index].patient_name);
    this.patientGroup.controls.address.setValue(this.responseDatas[index].patient_address);
    this.patientGroup.controls.nationality.setValue(this.responseDatas[index].nationality);
    this.patientGroup.controls.gender.setValue(this.responseDatas[index].gender);
    this.patientGroup.controls.age.setValue(this.responseDatas[index].age);
    this.patientGroup.controls.marital_status.setValue(this.responseDatas[index].marital_status);
    this.patientGroup.controls.phone.setValue(this.responseDatas[index].phone);
    this.patientGroup.controls.email.setValue(this.responseDatas[index].email);
    this.idForUpdate = index
  }
  updatePatient(){
    this.update = true;
    this.Update = "Updating..."
    if(this.patientGroup.valid){
      
      let param = this.patientGroup.value;
      param['id']=this.responseDatas[this.idForUpdate].id;
      if(this.patientGroup.controls.email.value){
        param['email'] = this.patientGroup.controls.email.value.toLowerCase();
      }
    this.ModifyService.updatePatient(param)
    .subscribe(
      response=>{
        this.Notify = true;
        this.notify = "Successfully Stored !"
        this.notifyDismiss();
        //console.log(response);
        if(response.length > 0){
          this.showTable= true;
          this.update = false;
          this.Update = "Update"
          for(let x in this.responseDatas ){
            if(x == this.idForUpdate){
              this.responseDatas[x].patient_name = response[0].patient_name;
              this.responseDatas[x].patient_address =response[0].patient_address;
              this.responseDatas[x].gender = response[0].gender;
              this.responseDatas[x].age =response[0].age;
              this.responseDatas[x].nationality = response[0].nationality;
              this.responseDatas[x].phone =response[0].phone;
              this.responseDatas[x].marital_status = response[0].marital_status;
              this.responseDatas[x].email =response[0].email;
              break;
            }
          }

          }
          else{
            this.Notify = true;
            this.notify = "Could'nt Update !"
            this.notifyDismiss();
          }

        },
        error=>{
          this.Notify = true;
          this.notify = "Sorry error in server !"
          this.notifyDismiss();
        }
      );
    }
    else{
      this.Notify = true;
      this.notify = "Fill form properly !"
      this.notifyDismiss();
      for( let x in this.patientGroup.controls){
        this.patientGroup.controls[x].markAsDirty();
        this.patientGroup.controls[x].markAsTouched();
      }
    this.update = false;
    this.Update = "Update"
    }
  }

  
notifyDismiss(){
  setTimeout(function () {
    this.Notify = false;
  }.bind(this), 3000);  
}

}