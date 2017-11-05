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
  // public processCash : FormControl;
  // public processDiscount : FormControl;
  // public processDiscountPer : FormControl;
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
  public discountExist = false;
  public printDrOrCr;
  public globleTotalAmount;
  // public tempGlobleVar;
  // public tempCashGlobleVar;



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
    
    // this.SearchPayment = new FormGroup({
    //   Search_name:new FormControl('', Validators.required)
    // })

    this.transactionData = new FormGroup({
      cash: new FormControl('',[
        Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"),
      //  Validators.maxLength(6)
      ]),
      checkDiscount: new FormControl('0'),
      discountcheck: new FormControl('',Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")),
      credit: new FormControl(''),
      backedMoney:new FormControl(''),
      // discountPer  : new FormControl('')
    });

    // console.log(this.transactionData.controls.checkDiscount.value);
    // console.log(this.transactionData.controls.checkDiscounPert.value);



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





        // let tempData;
        for (let x in response) {
          if (response[x].common_code.toUpperCase() == 'AGP') {
            if (this.ageGroupFromServer == undefined) {
              // tempData = [
              //   {age_group:response[x].common_description, enable:1},
              // ]
              this.ageGroupFromServer = response[x].common_description;
            }
            else {
              // tempData.push({age_group:response[x].common_description, enable:1})
              this.ageGroupFromServer.push(response[x].common_description);
            }
          }
          // this.age_groupInDropdown = tempData;
        }


        // this.routeParameter = this.route.params
        // .subscribe(params => {
        //   console.log(params);
        //   this.paramId= params['id'];
        //   if(this.paramId){
        //     this.isurlid = true;
        //     this.disableme = true;
        //     this.searchpayment(this.paramId).subscribe(
        //       success=>{
        //         console.log(this.patientDatas);
        //         // for (let i in this.patientDatas) {
        //           this.invoice(this.patientDatas[0].testbooking_id);
        //         // }
        //     },err=>{
        //       console.log(this.patientDatas);
        //     })

        //   }
        // });



        // console.log(this.FormUnits , this.genderInDropdowns, this.age_groupInDropdown)
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
    if (this.drOrCr == "cr") {
      this.sum = this.globleSum;
      this.UseForCredit = true;
      this.totalAmt = checksum;
    }
    else if(!this.drOrCr){
      this.returnableAmt = -checksum;
    }
    else {
      if (checksum < 0) {
        this.UseForCredit = true;
        this.sum = 0
        this.returnableAmt = -(checksum);
        this.tempDrOrCr = 'cr'
        this.totalAmt = -(checksum)
      }
      else if(checksum > 0) {
        this.sum = checksum;
        this.returnableAmt = 0;
        this.UseForCredit = false;
        this.totalAmt = checksum;
        this.tempDrOrCr = 'dr'
      }
      else{
        this.sum = checksum;
        this.returnableAmt = 0;
        this.UseForCredit = false;
        this.totalAmt = checksum;
        this.tempDrOrCr = '';
      }
    }
    if(!this.globleTotalAmount){
      this.globleTotalAmount = this.totalAmt;
      this.printDrOrCr = this.tempDrOrCr;
    }

  }



  public searchpayment(id): Observable<any> {
    return new Observable(observer => {
      if (id) {
        this.transactionservice.getPatientTest(id)
          .subscribe(
          (response) => {
            if (response.length > 0) {
              this.SearchNotify = false;
              console.log(response);
              this.patientDatas = [];
              this.patientDatas = response;
              // if(response.length > 0){
              //   this.SearchNotify = false;
              //   this.sum = 0;
              //   console.log(response);
              //   this.genderinPatientTable = response[0].gender;
              //   this.patientName = response[0].patient_name;
              //   this.patientId = response[0].reg_no;
              //   this.registeredDate = response[0].created_at;
              //   // this.patientDatas = response;

              let ageRange = [];
              for (let i in this.ageGroupFromServer) ageRange.push(JSON.parse(JSON.stringify(this.ageGroupFromServer[i])))
              // console.log(ageRange);
              let splitAge = [];
              for (let x in ageRange) {
                splitAge.push(ageRange[x].split(" "));
              }
              // console.log(splitAge);
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
                  // console.log((changeInNum));
                  // if(changeInNum.toUpperCase() ==  )
                }
              }
              // console.log(intCollection);
              console.log("this is int list")
              for (let int = 0; int < intCollection.length; int += 2) {
                // console.log(int);
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

          },
          (error) => {
            this.SearchNotify = true;
            this.Searchnotify = "Sorry Error in Server!!!"
            observer.complete();
          });
      }
    });
  }
  // }

  // routedinvoice(term){
  //   console.log(term)
  //   let id = term.testbookings_id
  //   this.activepaymentForm = false;
  //   console.log(id);
  //   this.transactionData.reset();
  //   this.transactionData.controls.checkDiscount.setValue('0')
  //   // this.sum = 0;
  //   this.patientDatasDetails = [];
  //     this.transactionservice.getDetialsOfTestbooking(id)
  //     .subscribe(
  //     (response) => {
  //       console.log(response);
  //       for (let i in response) {
  //         // console.log(response[i].age_group);
  //         // console.log(this.throwage);
  //         // console.log(this.genderinPatientTable);
  //         // console.log(response[i].genderdetails);


  //         if (response[i].age_group == this.throwage && this.genderinPatientTable == response[i].genderdetails) {
  //           this.patientDatasDetails.push(response[i]);
  //         }
  //       }
  //       this.activepaymentForm = true;
  //       console.log(this.patientDatasDetails);
  //       // if(!(this.sum > 0)){
  //       //   for(let x in this.patientDatasDetails){
  //       //     this.sum = this.sum +  parseInt(this.patientDatasDetails[x].rate);
  //       //     console.log(this.sum);
  //       //     this.globleSum = this.sum;
  //       //   }
  //       // }
  //     },
  //     (error) => {
  //       console.log("sorry error in server")
  //     });


  // }
  invoice(id) {
    console.log(id);
    this.transactionData.reset();

    // this.sum = 0;
    this.patientDatasDetails = [];
    // // this.sum = null;
    // let typeofInvoice = typeof id;
    // console.log(typeofInvoice);
    // console.log(id);
    // if(typeofInvoice == 'number'){
    // this.transactionservice.getDetialsOfPatients(id)
    // .subscribe(
    // (response) => {
    //   console.log(response);
    //     for (let i in response) {
    //       console.log(response[i].age_group);
    //       console.log(this.throwage);
    //       console.log(this.genderinPatientTable);
    //       console.log(response[i].genderdetails);


    //       // if (response[i].age_group == this.throwage && this.genderinPatientTable == response[i].genderdetails) {
    //         this.patientDatasDetails.push(response[i]);
    //       // }
    //     }
    this.activepaymentForm = true;
    //     console.log(this.patientDatasDetails);
    //     // if(!(this.sum > 0)){
    //     //   // for(let x in this.patientDatasDetails){
    //     //     this.sum = this.sum +  parseInt(this.patientDatasDetails[0].balance);
    //     //     console.log(this.sum);
    //     //     this.globleSum = this.sum;
    //     //   // }
    //     //   // this.previousAmount=0;
    //     //   // this.previousAmount = this.previousAmount+ parseInt(this.patientDatasDetails[0].invoiceBalance);
    //     // }
    //   },
    //   (error) => {
    //     console.log("sorry error in server")
    //   });

    // }
    // else{
    console.log(id)
    this.idToGetTest = id.id;
    console.log(this.idToGetTest);
    // this.genderinPatientTable = id.gender;
    this.patientName = id.patient_name;
    this.patientId = id.reg_no;
    this.registeredDate = id.created_at;
    this.patientAddress = id.patient_address;
    // for (let i in this.patientDatas) {
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

          if(response[response.length-1].discount_amount > 0){
            console.log('disamount',response[response.length-1].discount_amount)
            // this.transactionData.controls.checkDiscount.setValue('0')
            // this.transactionData.controls.discountcheck.setValue(response[response.length-1].discount_amount)
            this.discountExist=true;
            // this.globleParam = this.sum;
            // this.totalAmt = this.
            // this.globleSum = response[response.length-2].balance;
          }
          if(response[response.length-1].discount_percentage >0){
            console.log('disper',response[response.length-1].discount_percentage)
            // this.transactionData.controls.checkDiscount.setValue('1')
            // this.transactionData.controls.discountcheck.setValue(response[response.length-1].discount_percentage)
            this.discountExist = true;
            console.log('disper',this.transactionData.controls.discountcheck.value)
          }
          // console.log(this.sum)
        }

        if(response[response.length-1].print == 1){
          this.copyRecipt ==true;
        }
        // for (let i in response) {
        // console.log(response[i].age_group);
        // console.log(this.throwage);
        // console.log(this.genderinPatientTable);
        // console.log(response[i].genderdetails);


        // if (response[i].age_group == this.throwage && this.genderinPatientTable == response[i].genderdetails) {
        //   this.patientDatasDetails.push(response[i]);
        // }
        // }
        this.activepaymentForm = true;
        // console.log(this.patientDatasDetails);
        // if(!(this.sum > 0)){
        //   for(let x in this.patientDatasDetails){
        //     this.sum = this.sum +  parseInt(this.patientDatasDetails[x].rate);
        //     this.globleSum = this.sum;
        //     console.log(this.sum);
        //   }
        // }
      },
      (error) => {
        console.log("sorry error in server")
      });
    // }
  }

  // }

  transactionDatas(id) {
    if(this.transactionData.valid && this.transactionData.controls.cash.value){
      this.pay = true;
      this.Pay = "Paying..."
    let allData = id;
    // allData['invoiceBalance'] = this.globleSum
    allData['patientId'] = this.idToGetTest;
    allData['particular'] = "PL-TRANSACTION-AMT";
    allData['invoiceParticular'] = "INV-TRANSACTION-AMT";
    allData['testbookingid'] = null;
    allData['discountPer'] = 0;
    allData['discountAmt'] = 0;
    allData['invoiceBalance'] = 0;
    allData['backedMoney'] = 0;
    allData['dr'] = 0;
    allData['cash'] = 0;
    allData['balance'] = 0;
    allData['print'] = 1;

    if(this.tempDrOrCr =='cr'){
      if(this.transactionData.controls.cash.value){
        allData['cash'] = this.transactionData.controls.cash.value;
      }
      
      if(this.transactionData.controls.credit.value){
        allData['remark']="cr"
        allData['balance'] = this.totalAmt;
        // param['']
      }
      else if(this.transactionData.controls.backedMoney.value){
        allData['remark']=null;
        allData['backedMoney'] = this.totalAmt;
        allData['balance'] =0;
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
    else if(this.tempDrOrCr == 'dr'){
          allData['remark'] = "dr";
          allData['balance'] = this.sum;
          allData['invoiceBalance'] = this.sum;
    }
    else{
      allData['remark'] = null;
    }

    // if (this.drOrCr == "cr") {
    //   if(this.transactionData.controls.cash.value){
    //     allData['remark'] = "cr";
    //     allData['balance'] = Number(this.transactionData.controls.cash.value) + Number(this.sum);
    //   }
    // }
    // else if(this.drOrCr == "dr") {
    //   if (this.transactionData.controls.credit.value) {
    //     allData['remark'] = "cr";
    //     allData['balance'] = this.returnableAmt;
    //   }
    //   else {
    //     if (this.sum == 0) {
    //       allData['remark'] = null;
    //     }
    //     else {
    //       allData['remark'] = "dr";
    //       allData['balance'] = this.sum;
    //       allData['invoiceBalance'] = this.sum;
    //       allData['balance'] = this.sum;
    //     }
    //   }
    // }
        if(this.transactionData.controls.discountcheck.value){
          if(this.transactionData.controls.checkDiscount.value == 0){
            allData['discountAmt'] = this.transactionData.controls.discountcheck.value;
          }
          else{
            allData['discountPer'] = this.transactionData.controls.discountcheck.value;
          }
        }
        this.globleParam = allData;
    console.log(allData);
    console.log(this.patientDatasDetails)
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

