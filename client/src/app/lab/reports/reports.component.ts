import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

@Output()  ValuetransactionData = new EventEmitter<any>();

  private state;
  private value;
  private patientData;
  public  data;

  constructor() { }
  ngOnInit() {
  }
  OnreadyBtn(id){
    this.state=id
  }
  OnnotreadyBtn(id){
    this.state=id
  }
  OngetReportvalue(id){
    this.value=id
  }
  OnpatientData(patients){
    this.patientData=patients
  }
  OntransactionData(id){
    this.data = id;
    this.ValuetransactionData.emit(this.data);
    console.log(this.data);
  }
}
