
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import{ ReportService } from "../report.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-searchreports',
  templateUrl: './searchreports.component.html',
  styleUrls: ['./searchreports.component.css']
})
export class SearchreportsComponent implements OnInit {
  @Output()  getReportvalue= new EventEmitter<any>();
  @Input() set inputreadyReport(id){
    this.getReady(id)
  }
  patients=[];
  readylists=[];
  notreadylists=[];
  check;
  state;
  public responseData=null;
  constructor(private laravelservice: ReportService){}
   ngOnInit() {

    this.laravelservice.getReport().subscribe(
      patients => { this.patients = patients
        console.log(' my first data',this.patients)
        for(var i = 0 ; i < patients.datas.length; i++){
           var flag = false;
              var j = 0;
              for( j = i; j < patients.datas.length; j++){
                  if(patients.datas[i].testbooking_id === patients.datas[j].testbooking_id){
                    if(!flag && patients.datas[j].result === null){
                        flag = true
                      }
                  } else {
                     break;
                  }
              }  
              if(flag){  // Not ready Report      
                this.notreadylists.push(patients.datas[i])
              }else{    //ready report 
                this.readylists.push(patients.datas[i])
              }
              if(j === patients.datas.length){
                i = j;
              } else {
                i = j - 1;
              }
         }
    })
} 
  public getReady(id){
       this.state=id
     if(id = this.state){
        this.check=true
     }else{
        this.check=false
     }
  }
  getvalue(i){
    let id=i;
    this.getReportvalue.emit(id)
    this.laravelservice.getReportData(id).subscribe(
         (response)=>{
              this.responseData = response
         },
         (error)=>{
           console.log("sorry error in server");
         }
       )
    }
  
}





     