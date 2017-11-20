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
  public resetTest = 0;

  constructor() { }

  ngOnInit() {
  }

  public onSelectedPatient(id){
  	this.patientId=id
  }
  public onSelectedDep(id){
    this.Dep=id
    this.testype =undefined;
    this.resetTest = (Math.floor(Math.random() * 10) + 1)+this.resetTest;
    // //console.log(this.Dep);
  }
  onSelectedtestype(id){
    this.testype = undefined;
    this.testype = id;
    // //console.log(id);
  }
  onDragToSelected(id){    
    this.dragToSelectedNow = id;
  }
  onsetResponse(id){
    this.setResponse = id;
    // //console.log("in parent" + id);
  }
  onThrowAge(id){
    // //console.log(id);
    this.CatchAge = id;
  }
  onThrowGender(id){
    // //console.log(id);
    this.CatchGender = id;
  }

}
