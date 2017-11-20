
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import{ ReportService } from "../report.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

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
  @Input() set InputDaterange(id){
    this.daterange(id)
  }
  @Input() set Inputreponse(id){
    this.name(id)
  }
  @Input() set InputEmiitedvalue(data){
    this.Emiiteddata(data)
  }

  patients=[];
  public readylists=[];
  public notreadylists=[];
  check;
  state;
  public date;
  public datevalue=[];
  public readyarray=[];
  public notreadyarray=[];
  public date_array=[]; 
  public daterangevalue;
  public responseData=null;
  public term;
  public Notify=false;
  public notify;
  public value=-1;
  public tableDisabled=false;
  public is_disable=true;
  public checkforEmit;
  public Value_check=false;
  // public is_disable=false;
  constructor(private laravelservice: ReportService,private formBuilder: FormBuilder){}
   ngOnInit() {} 
   name(id){ 
     //console.log('axpecting undedine',id)
    if(id !== undefined){
         this.notreadylists=[]
         this.readylists=[]
         this.daterange(this.date)

     }   
   }
  Emiiteddata(data){
      //console.log('Emitted',data)
      this.is_disable=true;
      //console.log(this.is_disable)
    }
  public callFuctionReport(){
    // var today = new Date();
    // var end_dd = today.getDate();
    // var end_mm = today.getMonth()+1;
    // var end_yyyy =today.getFullYear();
    // var end_date = end_yyyy+'-'+end_mm+'-'+end_dd
    // var temp = today.getDate()-1;
    // var begin_dd=today.getDate()-temp;
    // if(begin_dd<10){
    //     var start_dd='0'+start_dd;
    // }else{
    //   start_dd=start_dd;
    // }
    // var begin_date = end_yyyy+'-'+end_mm+'-'+start_dd
    // this.date_array.push(begin_date,end_date);
    // this.laravelservice.getReport().subscribe(
    // patients => { this.patients = patients
    //  //console.log(' my first data',this.patients)
    //  for(var i = 0 ; i < patients.datas.length; i++){
    //     var flag = false;
    //        var j = 0;
    //        for( j = i; j < patients.datas.length;j++){
    //            if(patients.datas[i].testbooking_id === patients.datas[j].testbooking_id){
    //              if(!flag && patients.datas[j].result === null){
    //                  flag = true
    //                 }
    //            } else {
    //                 break;
    //             }
    //         }  
    //        if(flag){  // Not ready Report      
    //          this.notreadylists.push(patients.datas[i])
    //        }else{    //ready report 
    //          this.readylists.push(patients.datas[i])
    //        }
    //        if(j === patients.datas.length){
    //          i = j;
    //        } else {
    //          i = j - 1;
    //        }
    //   }
    // if(this.notreadylists !== undefined){
    //       for(let i = 0; i <this.notreadylists.length;i++){
    //         let dateRange = this.notreadylists[i].created_at.split(' ');
    //           if(new Date(this.date_array[0]).getDate() <= new Date(dateRange[0]).getDate()
    //              && new Date(this.date_array[1]).getDate() >= new Date(dateRange[0]).getDate()){
    //                this.notreadyarray.push(this.notreadylists[i]);
    //          }   
    //      }
    //  }
    //  if(this.readylists !== undefined){
    //     for(let i = 0; i<this.readylists.length;i++){
    //         let range=this.readylists[i].created_at.split(' ');
    //         if(new Date(this.date_array[0]).getDate() <= new Date(range[0]).getDate()
    //            && new Date(this.date_array[1]).getDate() >= new Date(range[0]).getDate()){
    //               this.readyarray.push(this.readylists[i]);
    //        }   
    //     }
    //  }
//  })
}
  private getReady(id){
       this.state=id
       //console.log('I ma checked',id)
     if(id = this.state){
        this.check=true
     }else{
        this.check=false
     }
  }
 daterange(id){
  this.notreadylists=[]
  this.readylists=[]
  this.date=id;
   //console.log('i am data',id)
   //console.log('Secound data',this.date)
   this.laravelservice.getReport(id).subscribe(
    patients => { this.patients = patients
     //console.log(' my first data',this.patients)
     for(var i = 0 ; i < patients.datas.length; i++){
        var flag = false;
           var j = 0;
           for( j = i; j < patients.datas.length;j++){
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
//    //console.log()
//  this.datevalue=id;
//      if(this.datevalue === undefined){
//          this.readylists=[];
//          this.notreadylists=[];   
//          this.notreadyarray=[];
//          this.readyarray=[];
//          this.callFuctionReport()
//      }else{
//          this.notreadyarray=[];
//          this.readyarray=[];
//       if(this.notreadylists.length !== 0){
//           for(let i = 0; i <this.notreadylists.length;i++){
//             let dateRange = this.notreadylists[i].created_at.split(' ');
//               if(new Date(this.datevalue[0]).getDate() <= new Date(dateRange[0]).getDate() && new Date(this.datevalue[1]).getDate() >= new Date(dateRange[0]).getDate())
//                  {
//                    this.notreadyarray.push(this.notreadylists[i]);
//              }   
//          }
//      }
//      //console.log('first',this.notreadyarray)
//      if(this.readylists.length !== 0){
//      for(let i = 0; i<this.readylists.length;i++){
//           let range=this.readylists[i].created_at.split(' ');
//           if(new Date(this.datevalue[0]).getDate() <= new Date(range[0]).getDate() && new Date(this.datevalue[1]).getDate() >= new Date(range[0]).getDate()){
//                   this.readyarray.push(this.readylists[i]);
//           }   
//         }
//       }
//     }
 }
  getvalue(i){
    let id=i;
    //console.log(id)
    var ed=new Date();
    var time=ed.getMilliseconds();
    this.tableDisabled=true;
    //console.log('I am Id',id)
    if(this.is_disable==true){
      var ed=new Date();
      var time=ed.getMilliseconds();
      this.getReportvalue.emit({id,time})
      this.value=id;
      this.is_disable=false;
    }
    //console.log('i ma check for Emit',this.checkforEmit)
    this.laravelservice.getReportData(id).subscribe(
         (response)=>{
              this.responseData = response
         },
         (error)=>{
           //console.log("sorry error in server");
         }
       )
    }
}





     