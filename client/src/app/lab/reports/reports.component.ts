import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @Output() valuetransactionData = new EventEmitter<any>();
  private timevalue;  
  private state;
  private value;
  private patientData;
  private billId;
  private Menulists=[];
  constructor(private router:Router) {
    this.Menulists= JSON.parse(localStorage.getItem('SelectMenuIten'));
    console.log(this.Menulists)
    for(let x in this.Menulists){
      if(this.Menulists[x].link !== this.router.url){
        //  this.router.navigate(['**'])
      }
    }
   }
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
    this.valuetransactionData.emit(id);
    console.log(id)
  }
}
