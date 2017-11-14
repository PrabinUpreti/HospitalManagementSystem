import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionService } from './transaction.service';
import { ModifyService } from './../modify/modify.service';
import { ActivatedRoute,Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';
import { ENV } from "../../env";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, OnDestroy {
  constructor(private transactionservice: TransactionService, private ModifyService: ModifyService, private router:Router) { }

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
  public registeredDate;
  public patientId;
  public globleSum;
  public sum = 0;
  public currentAmt;
  public activepaymentForm = false;
  public showTable = false;
  public routeParameter;
  public paramId;
  public searchField: FormControl;
  public SearchNotify = false;
  public Searchnotify;
  public transactionData: FormGroup;
  public drOrCr;
  public copyRecipt = false;
  public hidePayment = false;
  public startLoading = true;


  public selectedradioButton;
  public disableme = false;
  public activePayment = false;
  public routedList = true;
  public UseForCredit = false;
  public returnableAmt = 0;
  public totalAmt;
  public idToGetTest;
  public tempDrOrCr;
  public discountedAmount;
  public globleParam;
  public patientAddress;
  public printDrOrCr;
  public globleTotalAmount;

  public empityTransaction = false;



  public hospitalName;
  public panNumber;
  public hospitalAddress;
  public hospitalRegNo;
  public hospitalNumber;
  public PrintedDate;

  ngOnInit() {

    this.startLoading = false;
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
      cash: new FormControl('',[
        Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"),
      ]),
      checkDiscount: new FormControl('0'),
      discountcheck: new FormControl('',Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")),
      credit: new FormControl(''),
      backedMoney:new FormControl(''),
    });

    this.transactionData.controls.cash.valueChanges
      .subscribe(term => {
        this.calculateTotalAmount();
      });
    this.transactionData.controls.discountcheck.valueChanges
      .subscribe(term => {
        this.calculateTotalAmount();
      });


    this.searchField = new FormControl;
    this.searchField.valueChanges
    .debounceTime(400)
    .distinctUntilChanged()
    .subscribe(term => {
      if(term){
      this.startLoading=true;
        this.searchpayment(term).subscribe();
      }else{
        this.startLoading =false;
      }
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
      },
      (error) => {
        console.log("sorry error in server")
        this.Notify = true;
        this.notify = "Sorry couldn't load data from server please refresh it."
      });








  }
  calculateTotalAmount() {
    let discountAmount = (this.transactionData.controls.checkDiscount.value == 0) ? this.transactionData.controls.discountcheck.value : (((this.transactionData.controls.discountcheck.value) / 100) * this.globleSum);
    let checksum = this.globleSum - (Number(this.transactionData.controls.cash.value) + Number(discountAmount));
    this.discountedAmount = discountAmount;
    console.log('lets see',this.drOrCr,this.hidePayment)
    if (this.drOrCr == "cr") {
      this.sum = this.globleSum;
      this.hidePayment = true;
      this.tempDrOrCr = 'cr'
      this.totalAmt = checksum;
    }
    else if(!this.drOrCr){
      this.returnableAmt = -checksum;
      console.log("!this.drorcr")
    }
    else {
      this.hidePayment = false;
      console.log("else")
      if (checksum < 0) {
        this.UseForCredit = true;
        this.sum = 0
        this.returnableAmt = -(checksum);
        this.tempDrOrCr = 'cr'
        this.totalAmt = -(checksum)
        console.log("checksum<0")
      }
      else if(checksum > 0) {
        this.sum = checksum;
        this.returnableAmt = 0;
        this.UseForCredit = false;
        this.totalAmt = checksum;
        this.tempDrOrCr = 'dr'
        console.log("checksum>0")
      }
      else{
        this.sum = checksum;
        this.returnableAmt = 0;
        this.UseForCredit = false;
        this.totalAmt = checksum;
        this.tempDrOrCr = '';
        console.log("else")
      }
    }
    if(!this.globleTotalAmount){
      this.globleTotalAmount = this.totalAmt;
      this.printDrOrCr = this.tempDrOrCr;
      console.log("!lastif")
    }

  }



  public searchpayment(id): Observable<any> {
    return new Observable(observer => {
      this.startLoading =true;
      if (id) {
        this.transactionservice.getPatientTest(id)
          .subscribe(
          (response) => {
            if (response.length > 0) {
              console.log(response);
              this.patientDatas = [];
              this.patientDatas = response;
              this.startLoading =false;
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


              this.showTable = true;
              this.showTable = true;

              observer.next();
              observer.complete();
            }
            this.startLoading=false;

          },
          (error) => {
            this.startLoading =false;
            this.SearchNotify = true;
            this.Searchnotify = "Sorry Error in Server!!!"
            observer.complete();
          });
      }
      // this.startLoading=false;
    });
  }
  invoice(id) {
    this.startLoading = true;
    this.hidePayment = false;
    console.log(id);
    this.transactionData.reset();
    this.patientDatasDetails = [];
    this.activepaymentForm = true;
    console.log(id)
    this.idToGetTest = id.id;
    console.log(this.idToGetTest);
    this.patientName = id.patient_name;
    this.patientId = id.reg_no;
    this.registeredDate = id.created_at;
    this.patientAddress = id.patient_address;
    this.transactionservice.getDetialsOfPatients(this.idToGetTest)
      .subscribe(
      (response) => {
        console.log(response);
        console.log(response.length)
        if (response.length > 0) {
          this.drOrCr = response[response.length - 1].remark
          this.tempDrOrCr = this.drOrCr;
          this.transactionData.controls.checkDiscount.setValue('0')
          this.registeredDate = response[response.length - 1].created_at;
          this.sum = response[response.length - 1].balance;
          this.globleSum = this.sum;
          this.totalAmt = this.sum;
          this.returnableAmt = 0;
          if(this.drOrCr =='cr'){
            this.hidePayment = true;
          }
          if(this.drOrCr == 'dr'){
            this.hidePayment = false;
          }

          // if(response[response.length-1].discount_amount > 0){
          //   console.log('disamount',response[response.length-1].discount_amount)
          //   this.discountExist=true;
          // }
          // if(response[response.length-1].discount_percentage >0){
          //   console.log('disper',response[response.length-1].discount_percentage)
          //   this.discountExist = true;
          //   console.log('disper',this.transactionData.controls.discountcheck.value)
          // }
          this.startLoading =false;
        }
        this.startLoading =false;

        if(response[response.length-1].print == 1){
          this.copyRecipt ==true;
        }
        if(this.globleSum == 0 && this.totalAmt == 0){
          this.empityTransaction = true;
        }
        this.activepaymentForm = true;
      },
      (error) => {
        this.startLoading =false;
        console.log("sorry error in server")
      });
  }

  transactionDatas(id) {
    this.startLoading =true;
    if(this.hidePayment){
      this.transactionData.controls.cash.setValue('0');
    }
    if(this.transactionData.valid && this.transactionData.controls.cash.value){
      this.pay = true;
      this.Pay = "Paying..."
    let allData = id;
    allData['patientId'] = this.idToGetTest;
    allData['particular'] = "PL-TRANSACTION-AMT";
    allData['invoiceParticular'] = "INV-TRANSACTION-AMT";
    allData['testbookingid'] = null;
    allData['discountPer'] = 0;
    allData['discountAmt'] = 0;
    allData['backedMoney'] = 0;
    allData['subTotal'] = 0;
    allData['cash'] = 0;
    allData['balance'] = 0;
    allData['limCash'] = 0;
    allData['remark'] = 1;

    if(this.tempDrOrCr =='cr'){
      if(this.transactionData.controls.cash.value){
        allData['cash'] = this.transactionData.controls.cash.value;
        if(this.hidePayment == false){
          allData['subTotal'] = this.globleSum;
          allData['limCash'] = this.globleSum - this.discountedAmount;
        }
      }
      
      if(this.transactionData.controls.credit.value){
        allData['remark']="cr"
        allData['balance'] = this.totalAmt;
      }
      else {
        allData['remark']=null;
        allData['backedMoney'] = this.totalAmt;
        allData['balance'] =0;
      }
    }
    else if(this.tempDrOrCr == 'dr'){
          allData['cash'] = this.transactionData.controls.cash.value;
          allData['subTotal'] = this.globleSum;
          allData['remark'] = "dr";
          allData['balance'] = this.sum;
          allData['limCash'] = this.transactionData.controls.cash.value;
    }
    else{
      allData['remark'] = null;
      allData['limCash'] = this.globleSum;
    }
        if(this.transactionData.controls.discountcheck.value){
          if(this.transactionData.controls.checkDiscount.value == 0){
            allData['discountAmt'] = this.transactionData.controls.discountcheck.value;
          }
          else{
            allData['discountPer'] = this.transactionData.controls.discountcheck.value;
            allData['discountAmt'] = this.discountedAmount;
          }
        }
        this.globleParam = allData;
    console.log(allData);
    this.transactionservice.postInvoices(allData)
    .subscribe(
      (response)=>{
        console.log(response);
        
        this.notify="SuccessFully payed !"
        this.Notify = true;
        this.notifyDismiss()
        this.testbookingTransaction("testbookingTransaction");
        this.router.navigate(['/lab/redirecting/'+"fromaddtransaction"]);
      },
      (error)=>{
        this.startLoading =false;
        console.log(error);
        this.pay = false;
        this.Pay = "Pay"
        this.notify="Sorry Error in Server !"
        this.Notify = true;
        this.notifyDismiss()
      }
    );
  }
  else{
    this.startLoading =false;
    this.notify="Enter input field properly !"
    this.Notify = true;
    this.notifyDismiss()
    this.transactionData.controls.cash.markAsDirty();
    this.transactionData.controls.discountcheck.markAsDirty();
  }
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
  SearchBarDismiss() {
    this.showTable = false;
  }

  ngOnDestroy() {
    // this.routeParameter.unsubscribe();
  }

  notifyDismiss(){
    setTimeout(function () {
      this.Notify = false;
    }.bind(this), 3000);  
  }



  testbookingTransaction(id){
    var printContent = document.getElementById(id).innerHTML;
    this.startLoading =false;
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
              <body [ngClass]="{'bodyBg':copyRecipt ==true}" onload="window.print();window.close()">${printContent}
        </body>
    </html>`
 );
    newWin.document.close()
    // document.body.innerHTML = restorePage;
  }


}

