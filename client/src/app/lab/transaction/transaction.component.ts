import { Component, OnInit } from '@angular/core';
import{ TransactionService } from './transaction.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private transactionreport:TransactionService ) { }
  billData=[];
  ngOnInit() {
  }
  private getTestbookingID() {
        this.transactionreport.getbillData(1).subscribe(
            billData => {
            this.billData = billData 
            console.log(billData);
         });
      }
}
