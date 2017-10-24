import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-reports-form',
  templateUrl: './reports-form.component.html',
  styleUrls: ['./reports-form.component.css']
})
export class ReportsFormComponent implements OnInit {
  @Input() set inputgetReportvalue(id){
    this.getpatientData(id)
  }
  @Input() set inputpatientData(patients){
    this.getpatients(patients)
  }
  public test;
  patientData = new FormGroup({
    patient_ID: new FormControl('',Validators.required), 
    patient_name: new FormControl('',Validators.required),
    patient_address: new FormControl('',Validators.required), 
    patient_age: new FormControl('',Validators.required), 
    patient_gender: new FormControl('',Validators.required), 
    patient_date: new FormControl('',Validators.required),
    patient_marital: new FormControl('',Validators.required),  
    patient_phone: new FormControl('',Validators.required),  
    patient_email: new FormControl('',Validators.required),  
    patient_reffered: new FormControl('',Validators.required), 
    patient_nationality: new FormControl('',Validators.required)   
  });
patientsData=[];
private alive =false
  constructor() { }

  ngOnInit() {
  }
  getpatientData(id){
     // console.log(id)
}
 getpatients(patients){
   console.log(patients)
   if(patients === undefined) return 0
  //  this.alive =true;
   this.patientData.controls.patient_ID.setValue(patients[0].patients_id);
   this.patientData.controls.patient_name.setValue(patients[0].patient_name);
   this.patientData.controls.patient_address.setValue(patients[0].patient_address);
   this.patientData.controls.patient_age.setValue(patients[0].age);
   this.patientData.controls.patient_gender.setValue(patients[0].gender);
   this.patientData.controls.patient_marital.setValue(patients[0].marital_status);
   this.patientData.controls.patient_phone.setValue(patients[0].phone);
   this.patientData.controls.patient_email.setValue(patients[0].email);
   this.patientData.controls.patient_reffered.setValue(patients[0].doctor_name);
   this.patientData.controls.patient_nationality.setValue(patients[0].nationality);

  }
}
