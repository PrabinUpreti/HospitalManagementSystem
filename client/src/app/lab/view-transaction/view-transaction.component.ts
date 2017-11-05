import { Component, OnInit } from '@angular/core';
import { ViewTransactionService } from './view-transaction.service';
import {IMyDrpOptions} from 'mydaterangepicker';
import { FormGroup,FormBuilder,  FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {

  public myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek:'su',
    sunHighlight:false,
    disableHeaderButtons:false,
    // selectorHeight:'500px',
    // selectorWidth:'500px',
    // height:'34px',
    // width:'auto',
    // selectorWidth:'100%',
    // componentDisabled:true,
    editableDateRangeField:false,
    openSelectorOnInputClick:true,
  };



  constructor(private transactionService:ViewTransactionService,private formBuilder: FormBuilder) { }
  public patientLists = [];
  public activePayment = false;
  public patientInvoices = [];
  public activepatienttable = true;
  public patientName;
  public patientLedgers= [];
  public patientAllLedgers = []
  public patientAllLedgersChk = false
  public myForm: FormGroup;
  public searchByName:FormControl;

  ngOnInit() {

    
this.searchByName = new FormControl()
this.searchByName.valueChanges
.debounceTime(400)
.distinctUntilChanged()
.subscribe(term => {
  if(term.length>0){
    this.transactionService.searchpatientbyName(term)
    .subscribe((response)=>{
      if(response){
        this.patientLists = response;
      }

    },(error)=>{

    });
  }
  else{
    this.transactionService.getpatient()
    .subscribe(
      (response)=>{
        this.patientLists = response;
      },(error)=>{
        console.log("There is error in server");
      })
  }
});

    // let date =  new Date();
    // let endyear = date.getFullYear()
    // let endmonth = date.getMonth()
    // let endday = date.getDate()
    // // console.log(year)
    // let endDate = endyear+"-"+endmonth+"-"+endday;

    // let today = new Date();
    // today.setDate(today.getDate()-3);
    
    // let startyear = today.getFullYear()
    // let startmonth = today.getMonth()
    // let startday = today.getDate()
    // // console.log(year)
    // let startDate = startyear+"-"+startmonth+"-"+startday;




    this.myForm = this.formBuilder.group({
      myDateRange: ['', Validators.required],
      selecteddoctor:new FormControl('')
    });



    
    this.transactionService.getpatient()
    .subscribe(
      (response)=>{
        this.patientLists = response;
      },(error)=>{
        console.log("There is error in server");
      })
  
   
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

  getPatientByDate(){
    let param={};
    console.log(this.myForm.controls.myDateRange.value)
    if(this.myForm.controls.myDateRange.value){
      let dateRange = this.myForm.controls.myDateRange.value.formatted.split(' - ');
      param['startDate'] = dateRange[0];
      param['endDate'] = dateRange[1];
      console.log(param);
      this.transactionService.getpatientFromDate(param)
      .subscribe(
        (response)=>{
          if(response.length>0){
            console.log(response)
            this.patientLists = response;
          }
          else{
            alert("No datas")
          }
        },(error)=>{
          console.log("There is error in server");
        })
      }
      else{
        this.transactionService.getpatient()
        .subscribe(
          (response)=>{
            this.patientLists = response;
          },(error)=>{
            console.log("There is error in server");
          })
      }
  }



  getPatientInvoice(id){
    this.activepatienttable = false;
    this.transactionService.getPatientInvoiceFromServer(id)
    .subscribe(
      (response)=>{
        this.patientInvoices = response;
        console.log(response);
        this.patientAllLedgersChk = false
      },
      (error)=>{
        console.log("Hey! There is error in server my darling");
      })
  }

  back(){
    this.activepatienttable = true;
    this.activePayment = false;
  }

getLedger(id){
  this.transactionService.getPatientLedgerFromServer(this.patientInvoices[id].id)
  .subscribe(
    (response)=>{
      this.patientLedgers = response;
      console.log(response);
      this.activeInvoice(1)
      this.patientAllLedgersChk = false
    },
    (error)=>{
      console.log("Hey! There is error in server my darling");
    })
}

getAllPatientLedger(id){
  console.log(id)
  this.transactionService.getAllPatientLedgerFromServer(id)
  .subscribe(
    (response)=>{
      this.patientAllLedgers = response;
      console.log(response);
      this.patientAllLedgersChk = true
      this.activepatienttable = false;
      this.activeInvoice(1)
    },
    (error)=>{
      console.log("Hey! There is error in server my darling");
    })
}


  
activeInvoice(id){
  if(id == 0)
    this.activePayment = false;
  else 
    this.activePayment = true;
}

}
