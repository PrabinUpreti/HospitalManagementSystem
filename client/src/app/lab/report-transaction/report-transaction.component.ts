import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TestbookingTransactionService } from './../testbooking-transaction/testbooking-transaction.service';
import { ModifyService } from './../modify/modify.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';
import { ENV } from "../../env";



@Component({
  selector: 'app-report-transaction',
  templateUrl: './report-transaction.component.html',
  styleUrls: ['./report-transaction.component.css']
})
export class ReportTransactionComponent implements OnInit {

  constructor(
    private testbookingtransactionservice: TestbookingTransactionService,
    private ModifyService: ModifyService, 
    private route: ActivatedRoute,
    private router:Router,
  ) { }

  public SearchPayment: FormGroup;
  public patientDatas = [];
  public patientDatasDetails = [];
  public commoncodes = [];
  public notify;
  public Notify = false;  
  public Pay = "Pay";
  public pay = false;
  public ageGroupFromServer = [];
  public throwage;
  public genderinPatientTable;
  public patientName;
  public patientAddress;
  public registeredDate;
  public patientId;
  public globleSum;
  public sum = 0;
  public totalAmt;
  public activepaymentForm = false;
  public routeParameter;
  public paramId;
  public searchField: FormControl;
  public SearchNotify = false;
  public Searchnotify;
  public transactionData: FormGroup;
  public selectedradioButton;
  public disableme = false;
  public isurlid = false;
  public previousAmount = 0;
  public globlepreviousAmount;
  public globleTotalAmount;
  public returnableAmt = 0;
  public activePayment = false;
  public routedList = true;
  public drOrCr;
  public UseForCredit = false;
  public idForInvoiceUpdate;
  public discountedAmount;
  public drCrInTotal;
  public TEMPGlobletotalAmt;
  public ShowDiscount = true;
  public SumFromReport;
  public TempglobleSum;
  public totalExist = true;
  public updateDiscountPer = 0;
  public updateDiscountAmt = 0;
  public globleParam;
  public printDrOrCr;
  public copyRecipt = false;;


  public hospitalName;
  public panNumber;
  public hospitalAddress;
  public hospitalRegNo;
  public hospitalNumber;
  public PrintedDate;

  ngOnInit() {

    this.hospitalName = ENV.hospital;
    this.panNumber = ENV.pan_Numner;
    this.hospitalAddress = ENV.address;
    this.hospitalRegNo = ENV.RegNo;
    this.hospitalNumber = ENV.phone_number;
    let date = new Date();
    let year= date.getFullYear();
    let month= date.getMonth();
    let day= date.getDate();
    this.PrintedDate = year+'-'+month+'-'+day;


    this.transactionData = new FormGroup({
      cash: new FormControl('', Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")),
      checkDiscount: new FormControl('0'),
      discountcheck: new FormControl('',Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")),
      // payOld: new FormControl(''),
      credit: new FormControl(''),
      backedMoney:new FormControl('')
    });


    this.transactionData.controls.cash.valueChanges
      .subscribe(term => {
        this.calculateTotalAmount();
      });
    this.transactionData.controls.discountcheck.valueChanges
      .subscribe(term => {
        this.calculateTotalAmount();
      });
      
    // this.transactionData.controls.payOld.valueChanges
    // .subscribe(term=>{
    //     this.calculateTotalAmount();
    // })


    this.searchField = new FormControl;
    this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        this.searchpayment(term).subscribe();
      });


    this.ModifyService.commoncodes().subscribe(
      (response) => {
        if (response.length == 0) {
          this.Notify = true;
          this.notify = "There is no any Data ";
        }
        console.log(response);
        this.commoncodes = response;


        for (let x in response) {
          if (response[x].common_code.toUpperCase() == 'AGP') {
            if (this.ageGroupFromServer == undefined) {
              this.ageGroupFromServer = response[x].common_description;
            }
            else {
              this.ageGroupFromServer.push(response[x].common_description);
            }
          }
        }


        this.routeParameter = this.route.params
          .subscribe(params => {
            console.log(params);
            this.paramId = params['id'];
            if (this.paramId) {
              // this.isurlid = true;
              this.disableme = true;
              this.searchpayment(this.paramId).subscribe(
                success => {
                  console.log(this.patientDatas);
                  this.invoice(this.patientDatas[0].testbooking_id);
                }, err => {
                  console.log(this.patientDatas);
                })

            }
          });


      },
      (error) => {
        console.log("sorry error in server")
        this.Notify = true;
        this.notify = "Sorry couldn't load data from server please refresh it."
      });








  }
  calculateTotalAmount() {
    // this.ShowDiscount = true;
    let discountAmount = (this.transactionData.controls.checkDiscount.value == 0) ? this.transactionData.controls.discountcheck.value : (((this.transactionData.controls.discountcheck.value) / 100) * this.globleSum);
    let checksum = this.globleSum - (Number(this.transactionData.controls.cash.value) + Number(discountAmount));
    console.log(discountAmount);
    this.discountedAmount = discountAmount;
    // console.log(checksum);
    if(checksum < 0){   
      this.sum = 0
      this.returnableAmt = -(checksum);
      // if(this.transactionData.controls.credit.value)
      // this.transactionData.controls.credit.setValue(false);
    }
    else{
      this.sum = checksum;
      this.returnableAmt = 0;
      (this.globlepreviousAmount) ? this.previousAmount = this.globlepreviousAmount : '';
      // if(this.transactionData.controls.credit.value)
      // this.transactionData.controls.credit.setValue(false);
    }

    if(!this.globlepreviousAmount){
      this.globlepreviousAmount = this.previousAmount;
    }
    let checkprevious = (checksum < 0)?this.globlepreviousAmount -  (-checksum) : this.globlepreviousAmount;
    // console.log("checkprevious "+checkprevious);
    // console.log("checksum "+ checksum)
    // if(this.transactionData.controls.payOld.value){
      if(checkprevious < 0){
        this.previousAmount = 0;
        this.returnableAmt = -(checkprevious);
      }
      else{
        this.previousAmount = checkprevious;
        this.returnableAmt = 0
      }
    // }
    // else{
    //   // this.returnableAmt = -(checksum);
    //   this.previousAmount = this.globlepreviousAmount;
    // }
    if(this.previousAmount == 0 && this.sum == 0 && this.returnableAmt > 0){
      this.UseForCredit = true;
    }
    else{
      this.UseForCredit = false;
    }
    
    this.totalAmt = this.previousAmount;
    if(this.drOrCr == "dr" || !(this.drOrCr)){
      this.totalAmt = this.previousAmount + this.sum;
      this.drCrInTotal = 'dr';
      if(this.returnableAmt > 0){
        this.drCrInTotal = "cr"
        this.totalAmt = (this.returnableAmt);
      }
      else if(this.totalAmt == 0){
        this.drCrInTotal = "";
      }
      else{
        this.drCrInTotal = "dr"
        this.totalAmt = (this.totalAmt);        
      }
    }
    else if(this.drOrCr == "cr"){
      // if(this.returnableAmt>0){
      //   this.totalAmt+= this.returnableAmt;
      // }
      let temptotalAmt = this.sum - this.previousAmount;
      console.log(this.sum, this.previousAmount, this.TEMPGlobletotalAmt)
      console.log(temptotalAmt)
      if(temptotalAmt <= 0){
        this.drCrInTotal = "cr"
        this.UseForCredit = true;
        this.ShowDiscount = false;
        this.totalAmt = Number(this.TEMPGlobletotalAmt)+Number(this.transactionData.controls.cash.value);
      }
      else if(temptotalAmt > 0){
        this.drCrInTotal = "dr"
        this.totalAmt = temptotalAmt;
      }
      else{
        this.drCrInTotal = "";
      }
    }
    // if(this.SumFromReport){
    //   this.totalAmt = this.previousAmount;
    // }

    if(!this.globleTotalAmount){
      this.globleTotalAmount = this.totalAmt;
      this.printDrOrCr = this.drCrInTotal;
    }
  }

  public searchpayment(id): Observable<any> {
    return new Observable(observer => {
      console.log(id);
      this.testbookingtransactionservice.getPatientTestbookingTest(id)
        .subscribe(
        (response) => {
          console.log(response);
          if (response.length > 0) {
            console.log(response)
            this.idForInvoiceUpdate = response[response.length -1].invoice_id;
            this.SearchNotify = false;
            this.sum = 0;
            console.log(response);
            this.genderinPatientTable = response[0].gender;
            this.patientName = response[0].patient_name;
            this.patientId = response[0].reg_no;
            this.patientAddress = response[0].patient_address;
            this.registeredDate = response[0].created_at;





            let ageRange = [];
            for (let i in this.ageGroupFromServer) ageRange.push(JSON.parse(JSON.stringify(this.ageGroupFromServer[i])))
            let splitAge = [];
            for (let x in ageRange) {
              splitAge.push(ageRange[x].split(" "));
            }
            let changeInNum
            let intCollection = [];
            for (let y in splitAge) {
              for (let z = 0; z <= splitAge[y].length - 1; z++) {
                changeInNum = splitAge[y][z];
                if (parseInt(changeInNum)) {
                  intCollection.push(parseInt(changeInNum));
                }
                else {
                  if (intCollection.length < 1) {
                    intCollection.push(0);
                  }
                  else if (splitAge[parseInt(y)].length < 3) {
                    intCollection.push(200);
                  }
                }
              }
            }
            console.log("this is int list")
            for (let int = 0; int < intCollection.length; int += 2) {
              let term = response[0].age;
              if (term < 200) {
                if (term >= intCollection[int] && term <= intCollection[int + 1]) {
                  if (intCollection[int] == 0) {
                    this.throwage = "below " + intCollection[int + 1].toString();
                  }
                  else if (intCollection[int + 1] == 200) {
                    this.throwage = intCollection[int].toString() + " above";
                  }
                  else if (intCollection[int] != 0 && intCollection[int + 1] != 200) {
                    this.throwage = intCollection[int].toString() + " to " + intCollection[int + 1];
                  }
                }
              }
            }



            this.patientDatas = [];
            if (response.length >= 2) {
              if(response[response.length-1].dr >0){
                  this.previousAmount = Number(response[response.length - 2].balance);
                  if(this.previousAmount>0){
                    this.drOrCr = response[response.length - 1].remark;
                  }
                  else{
                    this.drOrCr = '';
                  }
                  this.sum = Number(response[response.length-1].dr);
                  this.globleSum = this.sum;
                  this.totalAmt = this.sum + this.previousAmount;
                  this.drCrInTotal = "dr"
                  // this.totalExist =true;
                  // else if(response[response.length-2].remark == null){
                  //   this.previousAmount = 0;
                  //   this.drOrCr = ""
                  // }
                  // else{
                  //   this.previousAmount = Number(response[response.length - 2].balance);
                  //   this.drOrCr = response[response.length - 2].remark;
                  // }
              }
              else{
                this.previousAmount = Number(response[response.length - 1].balance);
                this.drOrCr = 'dr';
                this.TempglobleSum =  Number(response[response.length-2].dr);
                this.globleSum = 0;
                this.totalAmt = this.previousAmount;
                this.drCrInTotal = "dr"
              }
            }
                else if(response.length = 1){
                  // this.SumFromReport = response[response.length-2].dr;

                // if(response[response.length - 1].remark == "dr"){
                  this.previousAmount = 0;
                  this.drOrCr = '';
                  this.sum = response[response.length-1].dr;
                  this.globleSum = this.sum;
                  this.totalAmt = this.sum;
                  this.drCrInTotal = "dr"
                  // }
                  // else if(response[response.length-1].remark == null){
                  //   this.previousAmount = 0;
                  //   this.drOrCr = ""
                  // }
                  // else{
                  //   this.previousAmount = Number(response[response.length - 1].balance);
                  //   this.drOrCr = response[response.length - 1].remark;
                  // }
                }
              }
              //   // }
              // else if(response.length < 2) {
              //   this.previousAmount = 0.00;
              //   this.drOrCr = ""
              // }
          //     if(response[response.length-1].invoices_balance >0){
          //       this.sum = response[response.length-1].invoices_balance
          //       this.globleSum = this.sum;
          //       this.totalExist =true;
          //     }
          //     else{
          //       this.globleSum = response[response.length-1].balance;
          //       this.totalExist = false;
          //     }
          //     this.totalAmt = this.previousAmount;
          //     if(this.drOrCr == "dr" || !(this.drOrCr)){
          //       this.totalAmt = this.previousAmount + this.sum;
          //       this.drCrInTotal = 'dr';
          //     }
          //     if(this.drOrCr == "cr"){
          //       let temptotalAmt = this.sum - this.previousAmount;
          //       if(temptotalAmt < 0){
          //         this.drCrInTotal = "cr"
          //         this.TEMPGlobletotalAmt = -temptotalAmt;
          //       }
          //     //   else{
          //     //     this.drCrInTotal = "";
          //     //   }
          //     }
          //     // this.TempglobleSum = response[response.length-2].dr;
          //     // this.globleTotalAmount = this.sum;
          //     // this.globleSum = this.sum;
              this.patientDatas = response;
              this.activepaymentForm = true;
            if(response[response.length-1].discount_amount > 0){
              console.log('disamount',response[response.length-1].discount_amount)
              this.ShowDiscount = false;
              this.updateDiscountAmt = response[response.length-1].discount_amount;
              // this.transactionData.controls.checkDiscount.setValue('0')
              // this.transactionData.controls.discountcheck.setValue(response[response.length-1].discount_amount)
            }
            if(response[response.length-1].discount_percentage >0){
              console.log('disper',response[response.length-1].discount_percentage)
              this.updateDiscountPer = response[response.length-1].discount_percentage;
              // this.transactionData.controls.checkDiscount.setValue('1')
              // this.transactionData.controls.discountcheck.setValue(response[response.length-1].discount_percentage)
              // console.log('disper',this.transactionData.controls.discountcheck.value)
              this.ShowDiscount = false;
            }
            if(response[response.length-1].print == 1){
              this.copyRecipt ==true;
            }
          //   if(response[response.length-1].dr >0){
          //     this.globleSum = response[response.length-1].dr
          //     console.log(this.globleSum)
          //   }
          //   else{
          //     this.globleSum = response[response.length-2].dr
          //     console.log(this.globleSum)
          //   }


          //   // this.activepaymentForm = false;
          //   this.activePayment = false;
          //   console.log(this.patientDatas);
          // }
          // else {
          //   this.SearchNotify = true;
          //   this.Searchnotify = "Sorry, No Data Are Found!!!"
          // }


          observer.next();
          observer.complete();

        },
        (error) => {
          this.SearchNotify = true;
          this.Searchnotify = "Sorry Error in Server!!!"
          observer.complete();
        });
    })
  }

  // routedinvoice(term) {
  //   console.log(term)
  //   let id = term.testbookings_id
  //   this.activepaymentForm = false;
  //   console.log(id);
  //   this.transactionData.reset();
  //   this.transactionData.controls.checkDiscount.setValue('0')
  //   this.patientDatasDetails = [];
  //   this.testbookingtransactionservice.getDetialsOfTestbookingTestbooking(id)
  //     .subscribe(
  //     (response) => {
  //       console.log(response);
  //       for (let i in response) {


  //         if (response[i].age_group == this.throwage && this.genderinPatientTable == response[i].genderdetails) {
  //           this.patientDatasDetails.push(response[i]);
  //         }
  //       }
  //       this.activepaymentForm = true;
  //       console.log(this.patientDatasDetails);
  //     },
  //     (error) => {
  //       console.log("sorry error in server")
  //     });


  // }


  invoice(id) {
    console.log(id);
    this.transactionData.reset();
    this.transactionData.controls.checkDiscount.setValue('0')
    this.patientDatasDetails = [];
    let typeofInvoice = typeof id;
    console.log(typeofInvoice);
    console.log(id);
      // this.testbookingtransactionservice.getDetialsOfPatientsTestbooking(id)
      //   .subscribe(
      //   (response) => {
      //     console.log(response);
      //     for (let i in response) {


      //       this.patientDatasDetails.push(response[i]);
      //     }
      //     this.activepaymentForm = true;
      //     console.log(this.patientDatasDetails);
      //   },
      //   (error) => {
      //     console.log("sorry error in server")
      //   });

  }

  transactionDatas(id) {    
    if(this.transactionData.valid && this.transactionData.controls.cash.value){
      this.pay = true;
      this.Pay = "Paying..."
      // let allData = id;
      // allData['amount'] = this.globleSum
      // console.log(allData);
      // console.log(this.transactionData.value);
      // console.log(this.patientDatas[this.patientDatas.length-1].testbooking_id);
      let param = this.transactionData.value;
      param['TestBookingId'] = this.patientDatas[this.patientDatas.length - 1].testbooking_id;
      param['InvoiceAmount'] = this.sum;
      if(this.ShowDiscount = false){
        param['DiscountAmount'] = 0;
        param['DiscountPer'] = 0;
      }
      else{
        param['DiscountAmount'] = this.updateDiscountAmt;
        param['DiscountPer'] = this.updateDiscountPer;
      }
      param['MoneyBack'] = 0;
      param['patientId'] = this.patientDatas[0].patient_id;
      param['inv_particular'] = "INV-CREATED-REPORT-TR"
      param['pl_particular'] = "PL-CREATED-REPORT-TR"
      param['print'] = 1;
      // param['pl_balance'] = this.totalAmt;
      param['updateInvoiceId'] = this.idForInvoiceUpdate;



      ///////////////==============UPDATED InvoiceAmount=======================\\\\\\\\\\\\\\\\\\
      if(this.transactionData.controls.cash.value ==0){
        param['InvoiceAmount'] = 0;
      }



      ////////////============UPDATE DISCOUNT OR DISCOUNT PERCENTAGE===============\\\\\\\\\\\
      if(this.transactionData.controls.discountcheck.value){
        if(this.transactionData.controls.checkDiscount.value == 1){
          param['DiscountPer'] = this.transactionData.controls.discountcheck.value
        }
        else{
          param['DiscountAmount'] = this.transactionData.controls.discountcheck.value;
        }

      }

      ////////////============UPDATE MONEY BACK===============\\\\\\\\\\\
      // if(!this.transactionData.controls.payOld.value){
      //   param['MoneyBack'] = this.returnableAmt;
      // }


      ////////////============UPDATE DR CR===============\\\\\\\\\\\
      if((this.drCrInTotal != "cr") && (this.drCrInTotal != "dr")){
          param['invoiceRemark'] = null;
          param['pl_balance'] = 0;
      }
      else{
        if(this.drCrInTotal == "dr"){
          param['invoiceRemark']="dr"
          param['pl_balance'] = this.totalAmt;
        }
        else{
          if(this.transactionData.controls.credit.value){
            param['invoiceRemark']="cr"
            param['pl_balance'] = this.totalAmt;
            // param['']
          }
          else if(this.transactionData.controls.backedMoney.value){
            param['invoiceRemark']=null;
            param['MoneyBack'] = this.totalAmt;
            param['pl_balance'] =0;
          }
          else{
            this.notify="Select Credit or Return Back !"
            this.Notify = true;
            this.notifyDismiss()
            this.pay = false;
            this.Pay = "Pay"
            return 0;
          }
        }
        // param['invoiceRemark']=this.drCrInTotal;
      }
      // else if(this.transactionData.controls.)
      
      // if(this.returnableAmt > 0 && (this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null) && this.previousAmount > 0){
      //   param['invoiceRemark'] = "dr";
      //   param['MoneyBack'] = this.returnableAmt;
      // }
      // else if(this.returnableAmt == 0 && this.transactionData.controls.payOld.value == true && this.previousAmount == 0 ){
      //   param['invoiceRemark'] = null;
      // }
      // else if(this.returnableAmt > 0 && this.transactionData.controls.payOld.value == true && this.previousAmount == 0){
      //   param['invoiceRemark'] = "cr";
      //   if(this.transactionData.controls.credit.value == null || this.transactionData.controls.credit.value == false){
      //   param['invoiceRemark'] = null;
      //   param['MoneyBack'] = this.returnableAmt;
      //   }
      // }
      // else if(this.returnableAmt == 0 && (this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null) && this.previousAmount == 0){
      //   param['invoiceRemark'] = null;
      // }
      // else if(this.returnableAmt == 0 && this.transactionData.controls.payOld.value == true && this.previousAmount >0){
      //   param['invoiceRemark'] = "dr";
      // }
      // else if(this.returnableAmt > 0 && (this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null) && this.previousAmount == 0 && this.sum == 0){
      //   if(this.transactionData.controls.credit.value == true){
      //     param['invoiceRemark'] = "cr";
      //   }
      //   else{
      //     param['invoiceRemark'] = null;
      //     param['MoneyBack'] = this.returnableAmt;
      //   }
      // }
      // else if(this.sum ==0 && this.returnableAmt ==0 && this.previousAmount > 0 &&(this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null)){
      //   param['invoiceRemark'] = "dr";      
      // }
      // else if(this.sum >0 && this.returnableAmt ==0 && this.previousAmount > 0 &&(this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null)){
      //   param['invoiceRemark'] = "dr";
      // }
      // else{
      //   return alert("SORRY, ERROR WHILE CHECKING DEBIT CRIDIT");
      // }
      // if(this.sum ==0 && this.returnableAmt > 0 && this.previousAmount == 0 && this.transactionData.controls.credit.value == true){
      //   param['pl_balance'] = this.returnableAmt;
      // }
      

      
      console.log(param)
      this.globleParam = param;
      this.testbookingtransactionservice.setpatienttransaction(param)
      .subscribe((response)=>{
        console.log(response)
        this.notify="SuccessFully payed !"
        this.Notify = true;
        this.notifyDismiss();
        this.testbookingTransaction("testbookingTransaction");
        this.router.navigate(['/lab/redirecting/'+"fromreport"]);
      },
      (error)=>{
        this.pay = false;
        this.Pay = "Pay"
        this.notify="Sorry Error in Server !"
        this.Notify = true;
        this.notifyDismiss()
        
      })
    }
    else{
      this.notify="Enter input field properly !"
      this.Notify = true;
      this.notifyDismiss()
      this.transactionData.controls.cash.markAsDirty();
      this.transactionData.controls.discountcheck.markAsDirty();

    }

  }

  showTestList(){
    this.notify="Under Construction !"
    this.Notify = true;
    this.notifyDismiss()    
  }
  activeInvoice(id) {
    if (id == 0)
      this.activePayment = false;
    else
      this.activePayment = true;
  }


  datadismis() {
    console.log('Hide')
    this.Notify = false;
  }

  ngOnDestroy() {
    this.routeParameter.unsubscribe();
  }
  
  notifyDismiss(){
    setTimeout(function () {
      this.Notify = false;
    }.bind(this), 3000);  
  }
  

  testbookingTransaction(id){
    var printContent = document.getElementById(id).innerHTML;
    var restorePage = document.body.innerHTML;
    
    var newWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto,menubar=no,titlebar=no,location=no,fullscreen=yes')
    newWin.document.body.innerHTML = printContent;
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
          opacity: 0.3;
          filter: alpha(opacity=30);
      }
      </style>
        </head>
              <body onload="window.print();window.close()">${printContent}
        </body>
    </html>`
 );
    newWin.document.close()
    // document.body.innerHTML = restorePage;
  }


}