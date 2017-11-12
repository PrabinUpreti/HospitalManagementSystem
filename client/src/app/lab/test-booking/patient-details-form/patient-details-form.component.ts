import { Directive,Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LaravelService } from './laravel.service';
import { ModifyService } from './../../modify/modify.service';

import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

declare var jQuery:any;


@Component({
  selector: 'app-patient-details-form',
  templateUrl: './patient-details-form.component.html',
  styleUrls: ['./patient-details-form.component.css']
})
export class PatientDetailsFormComponent implements OnInit {

  @Output() throwage = new EventEmitter<any>();
  @Output() throwgender = new EventEmitter<any>();
  @Output() throwPatientID = new EventEmitter<any>();

  @Input() set inputSelectedPatient(id){
    this.getPatientFromServer(id)
  }
  @Input() set inputsetResponse(id){
    this.setResponse(id)
  }

  // employees=[
  //   {name:"prabin", position:"manager"},
  //   {name:"Raj", position:"manager"},
  //   {name:"Upreti", position:"manager"}
  // ];
  patientData: FormGroup;
  agecontrol : FormControl;
  public testList;
  // patientId: FormControl;
  // patient_name: FormControl;
  // patient_address: FormControl;
  // age: FormControl;
  // gender: FormControl;
  // year: FormControl;
  public selectedList=[];
  public currentTime;
  public testStatus = false;
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
  public reffBys:any;

  public submitButtonStatus = true;
  public patientId:any ='000001';
  public commoncodes;
  public Notify = false;
  public notify;
  public genderInDropdowns = []
  public age_groupInDropdowns =[];
  public mrts = [];
  public refresh = false;
  public title;
  public routeToPayment;
  public showTable = false;
  public SearchNotify = false;
  public searchedDatas;
  public IsAlreadyExist = false;
  public forFutureUsePatientToSeeExistingPatient;
  public forFutureUsePatientToSeeExistingPatientName;
  public DisableInput = false;
  public startLoading = true;

  constructor(private laravelService: LaravelService, private ModifyService: ModifyService, private router:Router) { }
  ngOnInit() {
    this.startLoading = true;
    
    this.currentTime = new Date();
    let year = this.currentTime.getFullYear();
      for (let i = (year+57); i >= (year+57)-100; i--) {
        this.years.push(i);
       }
       for (let i = 1; i <= 32; i++) {
         this.days.push(i);
       }
    	
  	this.patientData = new FormGroup({
         patientId: new FormControl('', Validators.required),
         patient_name: new FormControl('', [
             Validators.minLength(3),
             Validators.maxLength(25),
             Validators.required
           ]),
         patient_address: new FormControl('', [
             Validators.minLength(2),
             Validators.maxLength(25),
             Validators.required
           ]),
         age: new FormControl('', [
           Validators.required,
          Validators.minLength(0),
          Validators.maxLength(2),
          ]),
         gender: new FormControl('', Validators.required),
         // dob: new FormControl(null, Validators.required),
         year: new FormControl('', Validators.required),
         month: new FormControl('', Validators.required),
         day: new FormControl('', Validators.required),
         marital_status: new FormControl('', Validators.required),
         phone: new FormControl('', [
             Validators.required
           ]),
         email: new FormControl('', Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")),
         identity_card: new FormControl('', [
             Validators.minLength(1),
             Validators.maxLength(40),
             Validators.required
           ]),

         reff_by: new FormControl('', Validators.required),
        //  Selectedtest: new FormControl('', Validators.required),
         // referred_by: new FormControl('', Validators.required),
      });

      this.agecontrol = new FormControl('');
      this.agecontrol.valueChanges
          .subscribe(term => {
            let ageRange = [];
            for(let i in this.age_groupInDropdowns) ageRange.push(JSON.parse(JSON.stringify(this.age_groupInDropdowns[i])))
            console.log(ageRange);
            let splitAge = [];
            for(let x in ageRange){
              splitAge.push(ageRange[x].split(" "));
            }
            console.log(splitAge);
            let changeInNum
            let intCollection=[];
            for(let y in splitAge){
              for( let z = 0; z <= splitAge[y].length-1; z++){
                changeInNum = splitAge[y][z];
                if(parseInt(changeInNum)){
                  intCollection.push(parseInt(changeInNum));
                }
                else{
                  if(intCollection.length < 1 ){
                    intCollection.push(0);
                  }
                  else if(splitAge[parseInt(y)].length < 3){
                    intCollection.push(200);
                  }
                }
                // console.log((changeInNum));
                // if(changeInNum.toUpperCase() ==  )
              }
            }
            console.log(intCollection);
            console.log("this is int list")
            for(let int = 0; int < intCollection.length; int+=2){
              console.log(int);
              if(term < 200){
                if(term >=intCollection[int] && term <= intCollection[int+1]){
                  if(intCollection[int] == 0){
                    this.throwage.emit("below "+ intCollection[int+1].toString());
                  }
                  else if (intCollection[int+1] == 200){
                    this.throwage.emit(intCollection[int].toString() + " above");
                  }
                  else if (intCollection[int] != 0 && intCollection[int+1] != 200){
                    this.throwage.emit(intCollection[int].toString() + " to "+ intCollection[int+1]);
                  }
              }
            }
            // console.log(intCollection[int] , intCollection[int+1]);
          }
          this.patientData.controls.age.setValue(term);
          if(this.patientData.controls.gender){
            console.log(this.patientData.value.gender);
            this.showTable = false;
          }

            // this.throwage.emit(term);
          });

          
            this.patientData.controls.patient_name.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(term => {
              if(!(this.patientData.controls.patient_name.value == this.forFutureUsePatientToSeeExistingPatientName)){
              this.searchpatient(term).subscribe();
            }
            });

      
      this.ModifyService.getDoctorList()
      .subscribe(
          (response)=>{
            this.reffBys=response
            console.log(response);
            this.startLoading = false;
          },
          (error)=>{
            this.startLoading=false;
              // this.submitButtonStatus=true
              console.log("ERROR successfully")
              this.Notify = true;
              this.notify = "Sorry couldn't load Doctor from server please refresh it."
              setTimeout(function () {
                this.Notify = false;
              }.bind(this), 3000);
          }
      );


      // if(this.genderInDropdowns == undefined){
        this.ModifyService.commoncodes() .subscribe(
          (response)=>{
            if(response.length == 0){
              this.startLoading = false;
              this.Notify = true;
              this.notify = "There is no any Data ";
              setTimeout(function () {
                this.Notify = false;
              }.bind(this), 3000);
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
            this.startLoading = false;



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
              if(response[x].common_code.toUpperCase() == 'AGP'){
                if(this.age_groupInDropdowns == undefined){
                  // tempData = [
                  //   {age_group:response[x].common_description, enable:1},
                  // ]
                  this.age_groupInDropdowns = response[x].common_description;
                }
                else{
                  // tempData.push({age_group:response[x].common_description, enable:1})
                  this.age_groupInDropdowns.push(response[x].common_description);
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
        // }


  }


  public responseData=null;

  patientDatas(){
    this.startLoading = true;
    if(!(this.forFutureUsePatientToSeeExistingPatient)){
      // alert(this.forFutureUsePatientToSeeExistingPatient);
      this.refresh = false;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getDate()+1;
        let week = date.getDay()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let ms = date.getMilliseconds();
        let patientId = "p"+year+""+month+""+hour+""+min+""+sec+""+ms;
        this.patientData.controls.patientId.setValue(patientId);
        this.patientData.controls.year.setValue((year) - this.patientData.controls.age.value);
        this.patientData.controls.day.setValue(day);
        this.patientData.controls.month.setValue(month);
        let testIdStoredInLocalStorage = JSON.parse(localStorage.getItem('test'))
        let testDetailsStoredInLocalStorage = JSON.parse(localStorage.getItem('testDetails'))
        if (this.patientData.valid) {
          if(testIdStoredInLocalStorage && testIdStoredInLocalStorage.length > 0){

            this.submitButtonStatus=false;
            let paramData : any = this.patientData.value;


            for(let x in this.reffBys){
              let y = this.patientData.controls.reff_by.value.split(".");
              if(this.reffBys[x].name.toUpperCase() == y[1].toUpperCase()){
                paramData['reff_by'] = this.reffBys[x].id;
                break;
              }
            }
            paramData['testID'] = testIdStoredInLocalStorage;
            paramData['testDetails'] = testDetailsStoredInLocalStorage;
            paramData['invoice'] = localStorage.getItem('sum');
            paramData['email'] = this.patientData.controls.email.value.toLowerCase();

            console.log(paramData);
            this.laravelService.getData(paramData)
              .subscribe(
                    (response)=>{
                      this.startLoading = false;
                      localStorage.removeItem('test');
                      localStorage.removeItem('sum');
                      localStorage.removeItem('testDetails');
                      this.title = "Do you want to pay?"
                      jQuery("#myModal").modal("show");
                      this.routeToPayment = {'link':'/lab/testbooking-transaction/'+ response.patientId};
                      this.responseData = response
                      this.patientData.reset();
                      this.patientData.controls.age.setValue('');
                      this.patientData.controls.patientId.setValue(this.patientId++);
                      this.patientData.controls.gender.setValue('');
                      this.patientData.controls.year.setValue('');
                      this.patientData.controls.month.setValue('');
                      this.patientData.controls.day.setValue('');
                      this.patientData.controls.marital_status.setValue('');
                      this.patientData.controls.reff_by.setValue('');
                      this.submitButtonStatus=true
                      this.Notify = true;
                      this.notify = "SuccessFully Saved";
                    },
                    (error)=>{
                      this.startLoading=false;
                        this.submitButtonStatus=true
                        this.Notify = true;
                        this.notify = "Sorry error in server";
                        setTimeout(function () {
                          this.Notify = false;
                        }.bind(this), 3000);
                    }
                )
              }
              else{
                this.startLoading = false;
                this.Notify = true;
                this.notify = "Please select test."
                setTimeout(function () {
                  this.Notify = false;
                }.bind(this), 3000);}

      }
      else{
        this.startLoading=false;
        
        this.Notify = true;
        this.notify = "Please fill the form properly."
        setTimeout(function () {
          this.Notify = false;
        }.bind(this), 3000);
        this.testStatus = true;
      console.log("error in client");
          for (let x in this.patientData.controls) {
            this.patientData.controls[x].markAsTouched();
            this.patientData.controls[x].markAsDirty();
          }

          // for (let x in this.myform.controls.name.controls) {
            
          // }
        
          // this.myform.get(["name","patientId"]).markAsDirty()
          // this.myform.get(["name","patientName"]).markAsDirty()

          // let nameGroup = <FormGroup>this.myform.get("name")
          // console.log(nameGroup.controls)

          // for(let x in nameGroup.controls)
          // {
          //   nameGroup.controls[x].markAsDirty();
          // }     

      }



      // let value = this.patientData.value
      //   console.log(value);
      // let paramData : any = this.patientData.value;
      // this.laravelService.getData(paramData)
      //   .subscribe(
      //         (response)=>{
      //           this.responseData = response
      //         },
      //         (error)=>{
      //             console.log("sorry error in server")
      //         }
      //     )
  }
  else{
    // alert(this.forFutureUsePatientToSeeExistingPatient);
    let testIdStoredInLocalStorage = JSON.parse(localStorage.getItem('test'))
    let testDetailsStoredInLocalStorage = JSON.parse(localStorage.getItem('testDetails'))
    if (this.patientData.valid) {
      if(testIdStoredInLocalStorage && testIdStoredInLocalStorage.length > 0){

        this.submitButtonStatus=false;
        let paramData : any = this.patientData.value;


        for(let x in this.reffBys){
          let y = this.patientData.controls.reff_by.value.split(".");
          if(this.reffBys[x].name.toUpperCase() == y[1].toUpperCase()){
            paramData['reff_by'] = this.reffBys[x].id;
            break;
          }
        }
        paramData['testID'] = testIdStoredInLocalStorage;
        paramData['testDetails'] = testDetailsStoredInLocalStorage;
        paramData['idToUpdate'] = this.forFutureUsePatientToSeeExistingPatient;
        paramData['invoice'] = localStorage.getItem('sum');

        console.log(paramData);
        this.laravelService.UpdateData(paramData)
          .subscribe(
                (response)=>{
                  this.startLoading=false;
                  localStorage.removeItem('test');
                  localStorage.removeItem('testDetails');
                  this.title = "Do you want to pay?"
                  jQuery("#myModal").modal("show");
                  this.routeToPayment = {'link':'/lab/testbooking-transaction/'+ response.patientId};
                  this.responseData = response
                  this.patientData.reset();
                  this.patientData.controls.age.setValue('');
                  this.patientData.controls.patientId.setValue(this.patientId++);
                  this.patientData.controls.gender.setValue('');
                  this.patientData.controls.year.setValue('');
                  this.patientData.controls.month.setValue('');
                  this.patientData.controls.day.setValue('');
                  this.patientData.controls.marital_status.setValue('');
                  this.patientData.controls.reff_by.setValue('');
                  this.submitButtonStatus=true
                  this.Notify = true;
                  this.notify = "SuccessFully Saved";
                },
                (error)=>{
                  this.startLoading=false;
                    this.submitButtonStatus=true
                    this.Notify = true;
                    this.notify = "Sorry error in server";
                    setTimeout(function () {
                      this.Notify = false;
                    }.bind(this), 3000);
                }
            )
          }
          else{
            this.startLoading=false;
            this.Notify = true;
            this.notify = "Please select test."
            setTimeout(function () {
              this.Notify = false;
            }.bind(this), 3000);}

  }
    else {
      this.startLoading=false;
      this.Notify = true;
      this.notify = "Please fill the form properly."
      setTimeout(function () {
        this.Notify = false;
      }.bind(this), 3000);
      this.testStatus = true;
      console.log("error in client");
      for (let x in this.patientData.controls) {
        this.patientData.controls[x].markAsTouched();
        this.patientData.controls[x].markAsDirty();
      }
    }
  }

  }

  public getPatientFromServer(id){
      if(id == undefined) return 0
      
      console.log(id)
      console.log(this.patientData);

      // this.patientData.controls.patientId.setValue(id)
  }

  public setResponse(id){
    if(id == undefined) return 0;
      if(id){
        console.log(id);
        // this.selectedList.push(id)
        // console.log("pushed to selectedList" + this.selectedList);
        // this.testStatus = true;
        // this.patientData.controls.Selectedtest.setValue(this.selectedList);
        // alert("hello world");
        // console.log(this.patientData.controls.Selectedtest.value);
      }
  }
  // selectAge(id){
  //   // this.age = new FormControl();
  //   // this.searchField.valueChanges
  //   //     .debounceTime(400)
  //   //     .distinctUntilChanged()
  //   //     .subscribe(term => {
  //   //       this.searches.push(term);
  //   //     });
  //   // console.log(id);
  //   // this.throwage.emit(id.target.value);
  // }
  selectGender(id){
    this.throwgender.emit(id.target.value);
  }
  // reffiredDoctorId(id){
  //   for(let x in this.reffBys){
  //     if("Dr."+this.reffBys[x].name == id.target.value){
  //       this.patientData.controls.reff_by.setValue(this.reffBys[x].id);
  //     }
  //   }
  //   // let idOfDoctor = this.reffBys[id].id;
  //   // this.patientData.controls.reff_by.setValue(idOfDoctor);
  // }
  print(){
    this.refresh = true;
    this.title = "Do you want to pay?"
  }

  resetFun(){
    this.router.navigate(['/lab/redirecting/'+"fromtestbooking"]);
  }


  searchpatient(id):Observable<any>{
    return new Observable(observer=>{
      this.startLoading=true;
      console.log(id);
      if(id){
      
      this.ModifyService.getPatient(id)
      .subscribe(
        response=>{
          this.startLoading=false;
          console.log(response);
          if(response.length > 0){
            this.showTable = true;
            this.IsAlreadyExist = true;
              this.searchedDatas = response;
              console.log(this.searchedDatas)
            }
            else{
              this.showTable = false;
            }

          },
          error=>{
            this.startLoading=false;
            this.showTable = false;
          }
        );

      observer.next();
      observer.complete();
      }
      else{
        this.startLoading=false;
        this.showTable = false;
      }
    });
    
  }
  SetPatientToForm(id){
    this.DisableInput = true;
    this.forFutureUsePatientToSeeExistingPatient = this.searchedDatas[id].id;
    this.forFutureUsePatientToSeeExistingPatientName = this.searchedDatas[id].patient_name;
    this.agecontrol.setValue(this.searchedDatas[id].age);
    this.patientData.controls.patientId.setValue(this.searchedDatas[id].reg_no);
    this.patientData.controls.gender.setValue(this.searchedDatas[id].gender);
    this.patientData.controls.year.setValue(this.searchedDatas[id].year);
    this.patientData.controls.month.setValue(this.searchedDatas[id].month);
    this.patientData.controls.day.setValue(this.searchedDatas[id].day);
    this.patientData.controls.marital_status.setValue(this.searchedDatas[id].marital_status);
    this.patientData.controls.patient_name.setValue(this.searchedDatas[id].patient_name);
    this.patientData.controls.patient_address.setValue(this.searchedDatas[id].patient_address);
    this.patientData.controls.email.setValue(this.searchedDatas[id].email);
    this.patientData.controls.identity_card.setValue(this.searchedDatas[id].identity_number);
    this.patientData.controls.phone.setValue(this.searchedDatas[id].phone);

    console.log(this.patientData.value);
    this.throwgender.emit(this.searchedDatas[id].gender);


  }

  datadismis(){
    console.log('Hide')
    this.Notify = false;
  }
  
  SearchBarDismiss(){
    this.showTable = false;
  }

  goToPayment(){
    jQuery("#myModal").modal("hide");
  }
  refreshAndRedirect(){
    this.router.navigate(['/lab/redirecting/'+"fromtestbooking"]);
  }

}