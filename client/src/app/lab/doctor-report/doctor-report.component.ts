import { Component, OnInit } from '@angular/core';
import {IMyDrpOptions} from 'mydaterangepicker';
import { FormGroup,FormBuilder,  FormControl, Validators } from '@angular/forms';
import { ModifyService } from './../modify/modify.service';
import { DoctorReportService } from './doctor-report.service';
import { ViewTransactionService } from '../view-transaction/view-transaction.service';
declare var jQuery:any;

@Component({
  selector: 'app-doctor-report',
  templateUrl: './doctor-report.component.html',
  styleUrls: ['./doctor-report.component.css']
})
export class DoctorReportComponent implements OnInit {

  public myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek:'su',
    sunHighlight:false,
    disableHeaderButtons:false,
    // selectorHeight:'500px',
    // selectorWidth:'500px',
    height:'34px',
    width:'auto',
    // selectorWidth:'100%',
    // componentDisabled:true,
    editableDateRangeField:false,
    openSelectorOnInputClick:true,
  };
  public myForm: FormGroup;
  public doctorlists;
  public Notify = false;
  public notify;
  public doctorDatas=[];
  public showTable = false;
  public commission = 0;
  public testAndRateForPrints=[]

  constructor(private formBuilder: FormBuilder,private ModifyService: ModifyService,
    private viewtransaction:ViewTransactionService,
     private DoctorReport: DoctorReportService) { }

  ngOnInit() {    

    this.myForm = this.formBuilder.group({
      myDateRange: ['', Validators.required],
      selecteddoctor:new FormControl('')
    });

  this.ModifyService.getDoctorList()
  .subscribe(
      (response)=>{
        this.doctorlists=response
        //console.log(response);
      },
      (error)=>{
          // this.submitButtonStatus=true
          //console.log("ERROR successfully")
          this.Notify = true;
          this.notify = "Sorry couldn't load Doctor from server please refresh it."
      }
  );

  }
  setDateRange(): void {
        // Set date range (today) using the setValue function
        let date = new Date();
        this.myForm.setValue({myDateRange: {
            beginDate: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            },
            endDate: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        }});
    }

    clearDateRange(): void {
        // Clear the date range using the setValue function
        this.myForm.setValue({myDateRange: ''});
    }


    doctorInfo(){
      let tempcommission = 0;
      this.commission = 0;
      let param={};
      if(this.myForm.controls.myDateRange.value && this.myForm.controls.selecteddoctor.value){
        let dateRange = this.myForm.controls.myDateRange.value.formatted.split(' - ');
        param['doctorId'] = this.doctorlists[this.myForm.controls.selecteddoctor.value].id;
        param['startDate'] = dateRange[0];
        param['endDate'] = dateRange[1] +" 23:59:59";
        // //console.log(JSON.stringify(param));
        this.DoctorReport.getDoctorTestbookingTransaction(param)
        .subscribe(
          (response)=>{
            if(response.length >0){
            this.doctorDatas=[];
            let tempJson = [];
            for(let x in response){
              if(response[x].dr > 0){
                tempJson.push(response[x]);
              }
            }
            this.doctorDatas = tempJson;
            //console.log(this.doctorDatas);
            this.showTable = true;
            for(let x in this.doctorDatas){
              tempcommission += Number(this.doctorDatas[x].dr);
            }
            let totcommission = ((response[0].commission)/100)*tempcommission;
            this.commission = Number(totcommission.toFixed(2));
          }else{
            alert("No datas Found !");
          }
          },
          (error)=>{
            //console.log(error);
          }
        );
      }
      else{
        this.showTable = false;
        this.Notify = true;
        this.notify = "invalid"
      }
    }

    getCommissionDetials(id){
      //console.log(id);
      let param={}
      param['testBookingId'] = id.testbooking_id;
      this.viewtransaction.updatePrint(param)
      .subscribe(
        (response)=>{
          //console.log(response);
          if(response.length >0){
          this.testAndRateForPrints = response;
          jQuery("#myModal").modal("show");
          }
        },
        (error)=>{
          //console.log(error);
        }
      )

    }


    datadismis(){
      //console.log('Hide')
      this.Notify = false;
    }


}
