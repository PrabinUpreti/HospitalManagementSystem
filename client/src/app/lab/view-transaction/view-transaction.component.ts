import { Component, OnInit } from '@angular/core';
import { ViewTransactionService } from './view-transaction.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {

  constructor(private transactionService:ViewTransactionService) { }
  public patientLists = [];
  public activePayment = false;
  public patientLadgerAndInvoices = [];
  public activepatienttable = true;
  public patientName;

  ngOnInit() {
    this.transactionService.getpatient()
    .subscribe(
      (response)=>{
        this.patientLists = response;
      },(error)=>{
        console.log("There is error in server");
      })
  }
  getPatientInvoice(id){
    this.activepatienttable = false;
    this.transactionService.getPatientInvoiceFromServer(id)
    .subscribe(
      (response)=>{
        this.patientLadgerAndInvoices = response;
        console.log(response);
      },
      (error)=>{
        console.log("Hey! There is error in server my darling");
      })
  }

  back(){
    this.activepatienttable = true;
  }

  
activeInvoice(id){
  if(id == 0)
    this.activePayment = false;
  else 
    this.activePayment = true;
}

}
