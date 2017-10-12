import { Component, OnInit } from '@angular/core';
// import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DashboardService } from './dashboard.service';


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
  ngOnInit() {
    this.dashboardservice.getPatient()
      .subscribe(
      (response) => {
        console.log(response)
        this.totalPatient = response.totalPatient;
        this.totalDoctor = response.totalDoctor;
        this.totalPatientToday = response.totalTodayPatient;
        this.totalDepartment = response.totalDepartment;
        this.totalTestType = response.totalTestType;
        this.totalTest = response.totalTest;
        
      },
      (error) => {

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

}
