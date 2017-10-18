import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TestbookingTransactionService } from './testbooking-transaction.service';
import { ModifyService } from './../modify/modify.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';



@Component({
  selector: 'app-testbooking-transaction',
  templateUrl: './testbooking-transaction.component.html',
  styleUrls: ['./testbooking-transaction.component.css']
})
export class TestbookingTransactionComponent implements OnInit {

  constructor(private testbookingtransactionservice: TestbookingTransactionService, private ModifyService: ModifyService, private route: ActivatedRoute) { }

  public SearchPayment: FormGroup;
  public patientDatas = [];
  public patientDatasDetails = [];
  public commoncodes = [];
  public notify;
  public Notify = false;
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
  public showTable = false;
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
  public CheckBoxdisabled = true;
  public drOrCr;
  public UseForCredit = false;


  ngOnInit() {

    this.transactionData = new FormGroup({
      cash: new FormControl('', Validators.required),
      checkDiscount: new FormControl('0'),
      discountcheck: new FormControl(''),
      payOld: new FormControl(''),
      credit: new FormControl('')
    });


    this.transactionData.controls.cash.valueChanges
      .subscribe(term => {
        this.calculateTotalAmount();
      });
    this.transactionData.controls.discountcheck.valueChanges
      .subscribe(term => {
        this.calculateTotalAmount();
      });
      
    this.transactionData.controls.payOld.valueChanges
    .subscribe(term=>{
        this.calculateTotalAmount();
    })


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
    let discountAmount = (this.transactionData.controls.checkDiscount.value == 0) ? this.transactionData.controls.discountcheck.value : (((this.transactionData.controls.discountcheck.value) / 100) * this.globleSum);
    let checksum = this.globleSum - (Number(this.transactionData.controls.cash.value) + Number(discountAmount));
    // console.log(checksum);
    if(checksum < 0){
      if(this.previousAmount !=0){
        this.CheckBoxdisabled=false;
      }      
      this.sum = 0
      this.returnableAmt = -(checksum);
      // if(this.transactionData.controls.credit.value)
      // this.transactionData.controls.credit.setValue(false);
    }
    else{
      this.sum = checksum;
      this.returnableAmt = 0;
      this.CheckBoxdisabled=true;
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
    if(this.transactionData.controls.payOld.value){
      if(checkprevious < 0){
        this.previousAmount = 0;
        this.returnableAmt = -(checkprevious);
      }
      else{
        this.previousAmount = checkprevious;
        this.returnableAmt = 0
      }
    }
    else{
      // this.returnableAmt = -(checksum);
      this.previousAmount = this.globlepreviousAmount;
    }
    if(this.previousAmount == 0 && this.sum == 0 && this.returnableAmt > 0){
      this.UseForCredit = true;
    }
    else{
      this.UseForCredit = false;
    }

    this.totalAmt = this.sum + this.previousAmount;
    
    
    // if(this.transactionData.controls.credit.value){
    //   // this.globlepreviousAmount = this.previousAmount;
    //   let checkpreviousAmount = this.previousAmount -  this.returnableAmt;
    //   if(this.previousAmount){
    //     if(checkpreviousAmount < 0){
    //       this.previousAmount = 0;
    //       this.returnableAmt = (this.globlepreviousAmount - (-(checksum)));
    //       console.log("hello")
    //     }
    //     else{
    //       this.previousAmount = checkpreviousAmount;
    //       this.returnableAmt = 0;
    //     }
    //   }
    //   if(checkpreviousAmount > 0){
    //     this.previousAmount = checkpreviousAmount;
    //   }
    //   else{
    //     this.returnableAmt = -(this.globlepreviousAmount - (-(checksum)));
    //     console.log("this is check"+this.returnableAmt);
    //   }
      
    // }
    // else{
    //   this.previousAmount = this.globlepreviousAmount;
    // }
  }

  public searchpayment(id): Observable<any> {
    return new Observable(observer => {
      this.testbookingtransactionservice.getPatientTestbookingTest(id)
        .subscribe(
        (response) => {
          console.log(response);
          if (response.length > 0) {
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
            this.showTable = true;
              if (response.length > 1) {
                if(response[response.length - 1].remark == "dr"){
                  this.previousAmount = Number(response[response.length - 1].balance);
                  this.drOrCr = response[response.length - 1].remark;
                  // if(response[response.length - 2].remark){
                  //   if(response[response.length - 2].remark == "cr"){
                  //     this.previousAmount == 0;
                  //     this.drOrCr ="";
                  //   }
                  // }
                  }
                  else if(response[response.length-1].remark == null){
                    this.previousAmount = 0;
                    this.drOrCr = ""
                  }
                  else{
                    this.previousAmount = Number(response[response.length - 1].balance);
                    this.drOrCr = response[response.length - 1].remark;
                  }
                }
              else {
                this.previousAmount = 0.00;
                this.drOrCr = ""
              }
              this.sum = Number(response[response.length - 1].invoices_balance);
              // this.currentAmt = this.sum;
              this.totalAmt = this.previousAmount;
              this.globleTotalAmount = this.sum;
              this.globleSum = this.sum;
              this.patientDatas = response;
              this.activepaymentForm = true;
              if(this.drOrCr == "dr"){
                this.previousAmount = this.previousAmount - this.sum;
                if(this.previousAmount < 0){
                  this.previousAmount = 0;
                  this.drOrCr = ""
                }
              }
              // else if(this.drOrCr == "cr"){
              //   this.previousAmount = this.previousAmount  this.sum;
              // }
              

            // else {
            //   for (let i in response) {
            //     console.log(this.patientDatas);
            //     if (this.patientDatas.length > 0) {
            //       let MatchFound = false;
            //       for (let y in this.patientDatas) {
            //         if (response[i].id == this.patientDatas[y].id) {
            //           MatchFound = true;
            //         }
            //       }
            //       if (!MatchFound) {
            //         this.patientDatas.push(response[i]);
            //       }
            //     }
            //     else {
            //       this.patientDatas.push(response[i]);
            //     }
            //   }
            // }


            this.showTable = true;
            // this.activepaymentForm = false;
            this.activePayment = false;
            console.log(this.patientDatas);
          }
          else {
            this.SearchNotify = true;
            this.Searchnotify = "Sorry, No Data Are Found!!!"
          }


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
    // let allData = id;
    // allData['amount'] = this.globleSum
    // console.log(allData);
    // console.log(this.transactionData.value);
    // console.log(this.patientDatas[this.patientDatas.length-1].testbooking_id);
    let param = this.transactionData.value;
    param['TestBookingId'] = this.patientDatas[this.patientDatas.length - 1].testbooking_id;
    param['InvoiceAmount'] = this.sum;
    param['DiscountAmount'] = 0;
    param['DiscountPer'] = 0;
    param['MoneyBack'] = 0;
    param['patientId'] = this.patientDatas[0].patient_id;
    param['pl_balance'] = this.totalAmt;
    if(this.transactionData.controls.discountcheck.value){
      if(this.transactionData.controls.checkDiscount.value == 1){
        param['DiscountPer'] = this.transactionData.controls.discountcheck.value
      }
      else{
        param['DiscountAmount'] = this.transactionData.controls.discountcheck.value;
      }

    }
    if(this.returnableAmt > 0 && (this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null) && this.previousAmount > 0){
      param['invoiceRemark'] = "dr";
      param['MoneyBack'] = this.returnableAmt;
    }
    else if(this.returnableAmt == 0 && this.transactionData.controls.payOld.value == true && this.previousAmount == 0 ){
      param['invoiceRemark'] = null;
    }
    else if(this.returnableAmt > 0 && this.transactionData.controls.payOld.value == true && this.previousAmount == 0){
      param['invoiceRemark'] = "cr";
      if(this.transactionData.controls.credit.value == null || this.transactionData.controls.credit.value == false){
      param['invoiceRemark'] = null;
      param['MoneyBack'] = this.returnableAmt;
      }
    }
    else if(this.returnableAmt == 0 && (this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null) && this.previousAmount == 0){
      param['invoiceRemark'] = null;
    }
    else if(this.returnableAmt == 0 && this.transactionData.controls.payOld.value == true && this.previousAmount >0){
      param['invoiceRemark'] = "dr";
    }
    else if(this.returnableAmt > 0 && (this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null) && this.previousAmount == 0 && this.sum == 0){
      if(this.transactionData.controls.credit.value == true){
        param['invoiceRemark'] = "cr";
      }
      else{
        param['invoiceRemark'] = null;
        param['MoneyBack'] = this.returnableAmt;
      }
    }
    else if(this.sum ==0 && this.returnableAmt ==0 && this.previousAmount > 0 &&(this.transactionData.controls.payOld.value == false || this.transactionData.controls.payOld.value == null)){
      param['invoiceRemark'] = "dr";      
    }
    else{
      return alert("SORRY, ERROR WHILE CHECKING DEBIT CRIDIT");
    }
    if(this.sum ==0 && this.returnableAmt > 0 && this.previousAmount == 0 && this.transactionData.controls.credit.value == true){
      param['pl_balance'] = this.returnableAmt;
    }
    

    
    console.log(param)
    this.testbookingtransactionservice.setpatienttransaction(param)
    .subscribe((response)=>{
      console.log(response)
    },
    (error)=>{
      
    })
    

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
    this.routeParameter.unsubscribe();
  }
  


}
