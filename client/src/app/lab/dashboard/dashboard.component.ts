import { Component, OnInit } from '@angular/core';
// import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { ENV } from "../../env"


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	// patientData: FormGroup;

  constructor(private dashboardservice:DashboardService) { }
  public totalPatient = 0;
  public totalDoctor = 0;
  public totalPatientToday = 0;
  public totalDepartment = 0;
  public totalTestType = 0;
  public totalTest = 0;
  public title
  public hospitalAddress;
  public established;
  public panNum;
  public regNum;
  public startLoading = true;
  public notify;
  public Notify = false;
  ngOnInit() {
    this.startLoading =true;
    this.title = ENV.hospital;
    this.hospitalAddress = ENV.address;
    this.established =ENV.established;
    this.panNum = ENV.pan_Number;
    this.regNum = ENV.RegNo;
    this.dashboardservice.getPatient()
      .subscribe(
      (response) => {
        //console.log(response)
        this.totalPatient = response.totalPatient;
        this.totalDoctor = response.totalDoctor;
        this.totalPatientToday = response.totalTodayPatient;
        this.totalDepartment = response.totalDepartment;
        this.totalTestType = response.totalTestType;
        this.totalTest = response.totalTest;
        this.startLoading = false;
        
      },
      (error) => {
        this.startLoading = false;
        this.notify="sorry Error in Server!"
        this.Notify = true;
        this.dataDismiss();
      });



    // this.dashboardservice.getDoctor()
    //   .subscribe(
    //   (response) => {

    //   },
    //   (error) => {

    //   });



    // this.dashboardservice.getTodayPatient()
    //   .subscribe(
    //   (response) => {

    //   },
    //   (error) => {

    //   });



    // this.dashboardservice.getDepartment()
    //   .subscribe(
    //   (response) => {

    //   },
    //   (error) => {

    //   });



  }
  dataDismiss(){
    setTimeout(function () {
      this.Notify = false;
    }.bind(this), 3000);
  }

}
