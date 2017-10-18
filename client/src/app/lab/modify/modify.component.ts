import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
 public showDepartment = true;
 public showTestType = false;
 public showTest = false;
 public showTestDetails = false;
 public showDoctor = false;
 public showPatient = false;
 public active1: boolean = true;
 public active2: boolean = false;
 public active3: boolean = false;
 public active4: boolean = false;
 public active5: boolean = false;
 public active6: boolean = false;
 public activeTestType: boolean = false;
 public activeTest: boolean = false;
 public passToTestType;
 public passToTest;
  constructor() { }

  ngOnInit() {
  }
  
  showDepartmentFun(){
    this.showDepartment = true;
    this.showTestType = false;
    this.showTest = false;
    this.showTestDetails = false;
    this.showDoctor = false;
    this.showPatient = false;
    this.active1 = true;
    this.active2 = false;
    this.active3 = false;
    this.active5 = false;
    this.active6 = false;
    this.activeTestType = false;
    this.activeTest = false;
  }

//   showTestDetailsFun(){
//     this.showDepartment = false;
//     this.showTestType = false;
//     this.showTest = false;
//     this.showTestDetails = true;
//     this.showDoctor = false;
//     this.showPatient = false;
//     this.active1 = false;
//     this.active2 = true;
//     this.active3 = false;
//     this.active4 = false;
//     this.activeTestType = false;
//     this.activeTest = false;
// }
showDoctorFun(){
  this.showDepartment = false;
  this.showTestType = false;
  this.showTest = false;
  this.showTestDetails = false;
  this.showDoctor = true;
  this.showPatient = false;
  this.active1 = false;
  this.active2 = false;
  this.active3 = true;
  this.active4 = false;
  this.activeTestType = false;
  this.activeTest = false;
}
showPatientFun(){
  this.showDepartment = false;
  this.showTestType = false;
  this.showTest = false;
  this.showTestDetails = false;
  this.showDoctor = false;
  this.showPatient = true;
  this.active1 = false;
  this.active2 = false;
  this.active3 = false;
  this.active4 = true;
  this.activeTestType = false;
  this.activeTest = false;
}

showTestFun(){
  this.showDepartment = false;
  this.showTestType = false;
  this.showTest = true;
  this.active1 = true;
  this.active2 = false;
  this.active3 = false;
  this.active4 = false;  
  this.activeTestType = false;
  this.activeTest = true;
}

  onHideDepartment(id){
    this.showDepartment = false;
    this.showTestType = true;
    this.showTest = false;
    this.active1 = true;
    this.active2 = false;
    this.active3 = false;
    this.active4 = false;
    this.activeTestType = true;
    this.activeTest = false;
    this.passToTestType = id;
  }
  onHideTestType(id){    
    this.showDepartment = false;
    this.showTestType = false;
    this.showTest = true;
    this.active1 = true;
    this.active2 = false;
    this.active3 = false;
    this.active4 = false;
    this.activeTestType = false;
    this.activeTest = true;
    this.passToTest = id;
  }
  onReloadDepartment(id){
    // this.showDepartment = true;
    // this.showTestType = false;
    // this.showTest = false;
  }
}
