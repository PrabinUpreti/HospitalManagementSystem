import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LaravelService } from './laravel.service';
import { ModifyService } from './../../modify/modify.service';


@Component({
  selector: 'app-patient-details-form',
  templateUrl: './patient-details-form.component.html',
  styleUrls: ['./patient-details-form.component.css']
})
export class PatientDetailsFormComponent implements OnInit {

  @Output() throwage = new EventEmitter<any>();
  @Output() throwgender = new EventEmitter<any>();

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
  public notify;
  public genderInDropdowns = []
  public age_groupInDropdowns =[];
  public mrts = [];

  constructor(private laravelService: LaravelService, private ModifyService: ModifyService) { }
  ngOnInit() {
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
             Validators.minLength(5),
             Validators.required
           ]),
         age: new FormControl('', [
          Validators.minLength(0),
          Validators.maxLength(3),
          Validators.required
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
             Validators.required
           ]),

         reff_by: new FormControl('', Validators.required),
        //  Selectedtest: new FormControl('', Validators.required),
         // referred_by: new FormControl('', Validators.required),
      });

      this.agecontrol = new FormControl();
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
            for(let y in splitAge){
              for( let z; z <= splitAge[y].length; z++){
                changeInNum = splitAge[y][z];
                console.log(changeInNum);
              }
            }

            this.throwage.emit(term);
          });

      
    this.ModifyService.getDoctorList()
    .subscribe(
          (response)=>{
            this.reffBys=response
            console.log(response);
          },
          (error)=>{
              // this.submitButtonStatus=true
              console.log("ERROR successfully")
          }
      );


      // if(this.genderInDropdowns == undefined){
        this.ModifyService.commoncodes() .subscribe(
          (response)=>{
            if(response.length == 0){
              this.notify = "There is no any Data ";
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
          });
        // }


  }


  public responseData=null;

  patientDatas(){
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getDate()+1;
      let week = date.getDay()+1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      let ms = date.getMilliseconds();
      let patientId = year+"-"+month+"-"+week+"-"+day+"-"+hour+"-"+min+"-"+ms;
      this.patientData.controls.patientId.setValue(patientId);
     if (this.patientData.valid) {
      
      console.log("Form Submitted!");

      this.submitButtonStatus=false


    let value = this.patientData.value
      console.log(value);
    let paramData : any = this.patientData.value;
    this.laravelService.getData(paramData)
      .subscribe(
            (response)=>{
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
            },
            (error)=>{
                this.submitButtonStatus=true
                console.log("Stored successfully")
            }
        )

    }
    else{
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

}