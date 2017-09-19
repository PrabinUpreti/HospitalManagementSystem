import { Component, OnInit } from '@angular/core';
// import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	// patientData: FormGroup;

  constructor() { }

  ngOnInit() {
	  // this.patientData = new FormGroup({
	  //      firstName: new FormControl()
	  //   });
  }

}
