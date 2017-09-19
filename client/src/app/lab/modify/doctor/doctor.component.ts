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
                    'Baishak',
                    'Jestha',
                    'Aashar',
                    'Shrawan',
                    'Bhadra',
                    'Ashwin',
                    'Kartik',
                    'Mangshir',
                    'Poush',
                    'Magh',
                    'Falgun',
                    'Chaitra'
                 ];

  ngOnInit() {

    this.currentTime = new Date();
    let year = this.currentTime.getFullYear();
      for (let i = (year+57); i >= (year+57)-100; i--) {
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
            Validators.maxLength(30),
          ]),
          email: new FormControl('', Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"))
  
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
    if(this.DoctorForm.invalid){
      for(let i in this.DoctorForm.controls){
        this.DoctorForm.controls[i].markAsTouched();
        this.DoctorForm.controls[i].markAsDirty();
    }
  }
  else{
    this.modifyService.putDoctor(this.DoctorForm.value) .subscribe(
      (response)=>{
        console.log(response);
          this.doctorDatas = response;
      },
      (error)=>{
          console.log("sorry error in server")
      });

  }
}

}
