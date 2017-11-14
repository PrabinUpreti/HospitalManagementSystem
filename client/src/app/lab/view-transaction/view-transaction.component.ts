import { Component, OnInit } from '@angular/core';
import { ViewTransactionService } from './view-transaction.service';
import {IMyDrpOptions} from 'mydaterangepicker';
import { FormGroup,FormBuilder,  FormControl, Validators } from '@angular/forms';
import { ENV } from "../../env";

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
  public active1 = true;
  public active2 = false;
  public active3 = false;
  public testAndRateForPrints;
  public startLoading = true;


  public notify;
  public Notify = false;

  
  public existPrint;
  public hospitalName;
  public panNumber;
  public hospitalAddress;
  public hospitalRegNo;
  public hospitalNumber;
  public PrintedDate;
  public printPatientId;
  public printPatientName;
  public printPatientAge;
  public printPatientGender;
  public printPatientMs;
  public printPatientNation;
  public allowPrint = false;
  public printInvoiceId;


  public allInvoicesLedgers=[];
  public totalBookedAmt = 0;
  public totalCash = 0;
  public totalDis = 0;
  public totalBck = 0;
  public totalBal = 0;
  public totalDrAmt = 0;
  public totalCrAmt = 0;

  public globleParam;

  public fromDate;
  public toDate;

  ngOnInit() {
        this.startLoading = true;
    
        this.hospitalName = ENV.hospital;
        this.panNumber = ENV.pan_Numner;
        this.hospitalAddress = ENV.address;
        this.hospitalRegNo = ENV.RegNo;
        this.hospitalNumber = ENV.phone_number;
        let date = new Date();
        let year= date.getFullYear();
        let month= date.getMonth()+1;
        let day= date.getDate();
        this.PrintedDate = year+'-'+month+'-'+day;

    
this.searchByName = new FormControl()
this.searchByName.valueChanges
.debounceTime(400)
.distinctUntilChanged()
.subscribe(term => {
  if(term){
    this.startLoading = true;
    if(term.length>0){
      this.myForm.reset()
    if(this.active1){
    this.transactionService.searchpatientbyName(term)
    .subscribe((response)=>{
      if(response){
        this.patientLists = response;
        this.startLoading = false;
      }

    },(error)=>{
      this.startLoading = false;
    });
  }
  else if(this.active2){
    this.totalBookedAmt = 0;
    this.totalBal =0;
    this.totalBck = 0;
    this.totalCash = 0;
    this.totalDrAmt =0;
    this.totalDis = 0;
    this.totalCrAmt = 0;
  this.transactionService.searchInvoicesbyName(term)
  .subscribe((response)=>{
    if(response.length >0){
    console.log(response);
    this.allInvoicesLedgers = response;
    this.startLoading = false;
    for(let x in this.allInvoicesLedgers){
      this.totalBookedAmt+= Number(this.allInvoicesLedgers[x].sub_total);
      this.totalCash += Number(this.allInvoicesLedgers[x].cash);
      this.totalDis += Number(this.allInvoicesLedgers[x].discount_amount);
      this.totalBck += Number(this.allInvoicesLedgers[x].returned_cash);
      // this.totalBal +=Number(this.allInvoicesLedgers[x].total_balance);
      if(this.allInvoicesLedgers[x].remark =='dr'){
        this.totalDrAmt += Number(this.allInvoicesLedgers[x].balance);
      }
      else if(this.allInvoicesLedgers[x].remark =='cr'){
        this.totalDrAmt += Number(this.allInvoicesLedgers[x].balance);
      }
    }
  }else{
  this.startLoading = false;
  this.Notify =true;
  this.notify = "sorry no data found"
  this.notifyDismiss();
  this.allInvoices();
  }

  },(error)=>{
    this.startLoading = false;
  });
}
}
}
  else{
    if(this.active1){
    this.transactionService.getpatient()
    .subscribe(
      (response)=>{
        // if(response.lenght>0){
        this.patientLists = response;
        this.startLoading = false;
        // }else{
          // this.startLoading = false;
          // alert('Sorry no data found !');
        // }
      },(error)=>{
        console.log("There is error in server");
        this.startLoading = false;
      })
  }
  else{
    
    // this.allInvoices();
  }
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
      myDateRangeForinvoices:['',Validators.required],
    });



    
    this.transactionService.getpatient()
    .subscribe(
      (response)=>{
        if(response.length>0){
        this.patientLists = response;
        this.startLoading = false;
        }else{
          this.startLoading = false;
          alert('Sorry No Data !');
        }
      },(error)=>{
        console.log("There is error in server");
        this.startLoading = false;
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
    this.myForm.setValue({myDateRangeForinvoices: {
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
    this.startLoading = true;
    let param={};
    console.log(this.myForm.controls.myDateRange.value)
    if(this.myForm.controls.myDateRange.value && this.active1){
      let dateRange = this.myForm.controls.myDateRange.value.formatted.split(' - ');
      param['startDate'] = dateRange[0];
      param['endDate'] = dateRange[1] + " 23:59:59";
      console.log(param);
      this.searchByName.reset();
      this.transactionService.getpatientFromDate(param)
      .subscribe(
        (response)=>{
          if(response.length>0){
            console.log(response)
            this.patientLists = response;
            this.startLoading = false;
          }
          else{
            this.startLoading = false;
            
            this.Notify =true;
            this.notify = "sorry no data found"
            this.notifyDismiss();
          }
        },(error)=>{
          console.log("There is error in server");
          this.startLoading = false;
        })
      }
      else{
        this.transactionService.getpatient()
        .subscribe(
          (response)=>{
            if(response.length>0){
            this.patientLists = response;
            this.startLoading = false;
            }else{
              this.startLoading = false;
              
              this.Notify =true;
              this.notify = "sorry no data found"
              this.notifyDismiss();
            }
          },(error)=>{
            console.log("There is error in server");
            this.startLoading = false;
          })
      }
  }



  getInvoicesByDate(){
    this.totalBookedAmt = 0;
    this.totalBal =0;
    this.totalBck = 0;
    this.totalCash = 0;
    this.totalDrAmt =0;
    this.totalDis = 0;
    this.totalCrAmt = 0;
    this.startLoading = true;
    let param={};
    console.log(this.myForm.controls.myDateRangeForinvoices.value)
    if(this.myForm.controls.myDateRangeForinvoices.value && this.active2){
      let dateRange = this.myForm.controls.myDateRangeForinvoices.value.formatted.split(' - ');
      param['startDate'] = dateRange[0];
      param['endDate'] = dateRange[1] + " 23:59:59";
      console.log(param);
      this.searchByName.reset();
      this.transactionService.getInvoicesFromDate(param)
      .subscribe(
        (response)=>{
          if(response.length >0){
          console.log(response);
          this.allInvoicesLedgers = response;
          this.startLoading = false;
          for(let x in this.allInvoicesLedgers){
            this.totalBookedAmt+= Number(this.allInvoicesLedgers[x].sub_total);
            this.totalCash += Number(this.allInvoicesLedgers[x].cash);
            this.totalDis += Number(this.allInvoicesLedgers[x].discount_amount);
            this.totalBck += Number(this.allInvoicesLedgers[x].returned_cash);
            // this.totalBal +=Number(this.allInvoicesLedgers[x].total_balance);
            if(this.allInvoicesLedgers[x].remark =='dr'){
              this.totalDrAmt += Number(this.allInvoicesLedgers[x].balance);
            }
            else if(this.allInvoicesLedgers[x].remark =='cr'){
              this.totalDrAmt += Number(this.allInvoicesLedgers[x].balance);
            }
          }
        }else{
        this.startLoading = false;
        
        this.Notify =true;
        this.notify = "sorry no data found"
        this.notifyDismiss();
        this.allInvoices();
        }
        },(error)=>{
          console.log("There is error in server");
          this.startLoading = false;
        })
      }
      else{
        this.transactionService.getpatient()
        .subscribe(
          (response)=>{
            if(response.length>0){
            this.patientLists = response;
            this.startLoading = false;
            }else{
              this.startLoading = false;
              
              this.Notify =true;
              this.notify = "sorry no data found"
              this.notifyDismiss();
            }
          },(error)=>{
            console.log("There is error in server");
            this.startLoading = false;
          })
      }
  }



  getPatientInvoice(id){
    this.startLoading = true;
    this.activepatienttable = false;
    this.transactionService.getPatientInvoiceFromServer(id)
    .subscribe(
      (response)=>{
        // if(response.lenght>0){
        this.patientInvoices = response;
        this.startLoading = false;
        console.log(response);
        this.patientAllLedgersChk = false
        // }else{
          // this.startLoading = false;
          // alert('Sorry There is No Invoices !');
        // }
      },
      (error)=>{
        alert("Error in server");
        this.startLoading = false;
      })
  }

  back(){
    this.activepatienttable = true;
    this.activePayment = false;
  }

getLedger(id){
  this.startLoading = true;
  this.transactionService.getPatientLedgerFromServer(this.patientInvoices[id].id)
  .subscribe(
    (response)=>{
      if(response.length>0){
      this.patientLedgers = response;
      console.log(response);
      this.activeInvoice(1)
      this.patientAllLedgersChk = false
      this.startLoading = false;
      }else{
        this.startLoading = false;
        alert('Sorry There is No Ledger !')
      }
    },
    (error)=>{
      console.log("Hey! There is error in server my darling");
      this.startLoading = false;
    })
}

getAllPatientLedger(id){
  this.startLoading = true;
  console.log(id)
  this.transactionService.getAllPatientLedgerFromServer(id)
  .subscribe(
    (response)=>{
      if(response.length>0){
      this.patientAllLedgers = response;
      console.log(response);
      this.patientAllLedgersChk = true
      this.activepatienttable = false;
      this.activeInvoice(1)
      this.startLoading = false;
      }else{
        this.startLoading = false;
        alert('Sorry There is no Ledger !')
      }
    },
    (error)=>{
      console.log("Hey! There is error in server my darling");
      this.startLoading = false;
    })
}



allInvoices(){
  this.startLoading = true;
  this.active1 = false; 
  this.active2 = true;
  this.active3 = false;
  this.totalBookedAmt = 0;
  this.totalBal =0;
  this.totalBck = 0;
  this.totalCash = 0;
  this.totalDrAmt =0;
  this.totalDis = 0;
  this.totalCrAmt = 0;
  this.myForm.reset();
  this.searchByName.reset();
  let invRaw={};

    let date =  new Date();
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    let tempDay;
    if(day < 10){
      tempDay = "0"+day;
      console.log(tempDay)
    }
    else{
      tempDay = day;
      console.log('not less');
    }
    let startDate = year+"-"+month+"-"+tempDay;

  invRaw['startDate'] = startDate;
  invRaw['endDate'] = startDate+" 23:59:59";
  this.fromDate = startDate;
  this.toDate = startDate+" 23:59:59";
  console.log(invRaw)
  this.transactionService.getAllInvoices(invRaw)
    .subscribe(
      (response)=>{
        if(response.length >0){
        console.log(response);
        this.allInvoicesLedgers = response;
        this.startLoading = false;
        for(let x in this.allInvoicesLedgers){
          this.totalBookedAmt+= Number(this.allInvoicesLedgers[x].sub_total);
          this.totalCash += Number(this.allInvoicesLedgers[x].cash);
          this.totalDis += Number(this.allInvoicesLedgers[x].discount_amount);
          this.totalBck += Number(this.allInvoicesLedgers[x].returned_cash);
          // this.totalBal +=Number(this.allInvoicesLedgers[x].total_balance);
          if(this.allInvoicesLedgers[x].remark =='dr'){
            this.totalDrAmt += Number(this.allInvoicesLedgers[x].balance);
          }
          else if(this.allInvoicesLedgers[x].remark =='cr'){
            this.totalDrAmt += Number(this.allInvoicesLedgers[x].balance);
          }
        }
      }else{
      this.startLoading = false;
      alert('Sorry No Invoices')
      }
      },
      (error)=>{
        console.log(error)
        this.startLoading = false;
      })
}

printInvoices(param){
    this.startLoading = true;
    this.printInvoiceId =param.id;
    this.globleParam = param;
    let testBookingId = param.testbooking_id;
    this.existPrint =param.print;
    let newPrintValue = {}
    newPrintValue['print']= Number(this.existPrint)+1;
    newPrintValue['testBookingId'] = testBookingId;
    console.log(newPrintValue);
    this.transactionService.updatePrint(newPrintValue)
    .subscribe(
      (response)=>{
        console.log(response);
        if(response.length >0){
        this.testAndRateForPrints = response;
        this.printPatientId = response[0].reg_no;
        this.printPatientName = response[0].patient_name
        this.printPatientAge = response[0].age
        this.printPatientGender = response[0].gender
        this.printPatientMs = response[0].marital_status
        this.printPatientNation = response[0].nationality
        }
        
          if(this.globleParam){
            this.allowPrint = true;
          }
          // console.log(this.printInvoiceId)
          console.log(this.globleParam);
          
          setTimeout(function () {
            this.printFun('invoice')
            this.startLoading = false;
          }.bind(this), 1000);

          
      },
      (error)=>{
        console.log(error);
      }
    )
}

notifyDismiss(){
  setTimeout(function () {
    this.Notify = false;
  }.bind(this), 3000);  
}
  
printFun(printId){
  // var restorePage = document.body.innerHTML;
  var printContent = document.getElementById(printId).innerHTML;
   
  // let printContents, popupWin;
  // printContents = document.getElementById('printSection').innerHTML;
  // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  
  var newWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto,menubar=no,titlebar=no,location=no,fullscreen=yes')
  
  newWin.document.body.innerHTML = printContent;
  // newWin.document.open();
  // newWin.window.print();


    newWin.document.write(`
    <html>
        <head>
        <style type="text/css">
        table{
          border:0px;
          border-style: dotted;
          width: 100%;
        }
        td{
          padding: 5px;
          text-align: left;
        }
                 
        .bodyBg {
          background-image: url("/assets/img/copy.png");
          background-repeat: no-repeat;
          background-position: center; 
          background-size: contain;
        }
      </style>
        </head>
              <body onload="window.print();window.close()">${printContent}
        </body>
        <script type="text/javascript">
        var existPrint = ${this.existPrint};
        
          if(existPrint > 0){
            document.body.className += ' bodyBg';
          }
          </script>
    </html>`
 );
    newWin.document.close()
}


  
activeInvoice(id){
  if(id == 0)
    this.activePayment = false;
  else 
    this.activePayment = true;
}

}
