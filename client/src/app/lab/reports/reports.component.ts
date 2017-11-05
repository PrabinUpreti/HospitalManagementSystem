import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @Output() valuetransactionData = new EventEmitter<any>();
  public timevalue;  
  public state;
  public value;
  public patientData;
  public billId;
  public Menulists=[];
  public inputdate;
  // public timeid;
  public valueId;
  public reponse_report;
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
  OngetReportvalue(id,time){
    this.value=id
    // this.timeid=time
  }
  OnpatientData(patients){
    this.patientData=patients
  }
  OntransactionData(id){
    this.valuetransactionData.emit(id);
    console.log(id)
  }
  OnDaterange(date){
    this.inputdate=date;
    console.log('new date range',this.inputdate)
  }
  Reponse_report(data){
   this.reponse_report=data;
   console.log('I am Response',this.reponse_report)
  }
}
