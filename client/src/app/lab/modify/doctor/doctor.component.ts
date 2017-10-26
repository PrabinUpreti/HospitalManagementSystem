import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModifyService } from './../modify.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private modifyService: ModifyService) { }
  public showList = true;
  public showForm = false;
  public emptyElement = false;
  public emptyNote;
  public doctorDatas = [];
  public DoctorForm: FormGroup;
  public currentTime;
  public years = [];
  public days = [];
  public months = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                 ];
  public prefixes = [];

  public Notify = false;
  public notify;
  public submit = false;
  public Submit = "Submit"
  public genderInDropdowns=[];
  public mrts =[];

  ngOnInit() {

    this.currentTime = new Date();
    let year = this.currentTime.getFullYear();
      for (let i = (year); i >= (year)-100; i--) {
        this.years.push(i);
       }
       for (let i = 1; i <= 32; i++) {
         this.days.push(i);
       }

    // if(this.doctorDatas == undefined){

      this.modifyService.getDoctorList() .subscribe(
        (response)=>{
          console.log(response);
          if(response.length != 0){
            this.doctorDatas = response;
          }
          else{
            this.emptyElement = true;
            this.emptyNote = "Sorry there is no data."
          }
        },
        (error)=>{
            console.log("sorry error in server")
        });

        this.DoctorForm = new FormGroup({
          prefix:new FormControl('', [
            Validators.required,
          ]),
          doctor_name:new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ]),
          doctor_address:new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ]),
          identity_card:new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
          ]),
          gender:new FormControl('', [
            Validators.required,
          ]),
          marital_status:new FormControl('', [
            Validators.required,
          ]),
          month:new FormControl('', [
            Validators.required,
          ]),
          day:new FormControl('', [
            Validators.required,
          ]),
          year:new FormControl('', [
            Validators.required,
          ]),
          phone:new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
          ]),
          email: new FormControl('', Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")),          
          commission:new FormControl('', [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(3),
          ]),
  
        });





        this.modifyService.commoncodes() .subscribe(
          (response)=>{
            if(response.length == 0){
              this.Notify = true;
              this.notify = "There is no any Data ";
              setTimeout(function () {
                this.Notify = false;
              }.bind(this), 3000);
            }
            console.log(response);
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
              if(response[x].common_code.toUpperCase() == 'MRT'){
                if(this.mrts == undefined){
                  this.mrts = response[x].common_description;
                }
                else{
                  this.mrts.push(response[x].common_description);
                }
              }
            }



            // let tempData;
            for(let x in response){
              if(response[x].common_code.toUpperCase() == 'PFX'){
                if(this.prefixes == undefined){
                  // tempData = [
                  //   {age_group:response[x].common_description, enable:1},
                  // ]
                  this.prefixes = response[x].common_description;
                }
                else{
                  // tempData.push({age_group:response[x].common_description, enable:1})
                  this.prefixes.push(response[x].common_description);
                }
              }
              // this.age_groupInDropdown = tempData;
            }



            
            // console.log(this.FormUnits , this.genderInDropdowns, this.age_groupInDropdown)
          },
          (error)=>{
              console.log("sorry error in server")
              this.Notify = true;
              this.notify = "Sorry couldn't load data from server please refresh it."
              setTimeout(function () {
                this.Notify = false;
              }.bind(this), 3000);
          });


  }
  configAddDoctor(){
    this.showList = false;
    this.showForm = true;
  }
  backFromForm(){
    this.showForm = false;
    this.showList = true;
  }
  DoctorForms(){
    
    this.submit = true;
    this.Submit = "Submitting...";

    if(this.DoctorForm.invalid){
      for(let i in this.DoctorForm.controls){
        this.DoctorForm.controls[i].markAsTouched();
        this.DoctorForm.controls[i].markAsDirty();                
        this.Notify = true;
        this.notify = "Fill the form Properly ! ";
        this.notifyDismiss();
        this.submit = false;
        this.Submit = "Submit";
    }
  }
  else{
    this.modifyService.putDoctor(this.DoctorForm.value) .subscribe(
      (response)=>{
        console.log(response);
            this.doctorDatas.splice(0,0,response);
            this.backFromForm()
            this.Notify = true;
            this.notify = "SuccessFully Submited";
            this.notifyDismiss();
            this.submit = false;
            this.Submit = "Submit";
      },
      (error)=>{
          // console.log("sorry error in server")
          
          this.Notify = true;
          this.notify = "Sorry error in server";
          this.notifyDismiss();
          this.submit = false;
          this.Submit = "Submit";
      });

  }
}
notifyDismiss(){
  setTimeout(function () {
    this.Notify = false;
  }.bind(this), 3000);  
}

}
