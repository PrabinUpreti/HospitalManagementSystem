import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-booking',
  templateUrl: './test-booking.component.html',
  styleUrls: ['./test-booking.component.css']
})
export class TestBookingComponent implements OnInit {

  public patientId;
  public Dep;
  public testype;
  public dragToSelectedNow;
  public setResponse;
  public CatchAge;
  public CatchGender;
  public resetTest;

  constructor() { }

  ngOnInit() {
  }

  public onSelectedPatient(id){
  	this.patientId=id
  }
  public onSelectedDep(id){
    this.Dep=id
    this.resetTest = true;
    // console.log(this.Dep);
  }
  onSelectedtestype(id){
    this.testype = id;
    this.resetTest = false;
    // console.log(id);
  }
  onDragToSelected(id){    
    this.dragToSelectedNow = id;
  }
  onsetResponse(id){
    this.setResponse = id;
    // console.log("in parent" + id);
  }
  onThrowAge(id){
    // console.log(id);
    this.CatchAge = id;
  }
  onThrowGender(id){
    // console.log(id);
    this.CatchGender = id;
  }

}
