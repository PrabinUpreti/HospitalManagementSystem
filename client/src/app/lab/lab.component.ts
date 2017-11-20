import { Component, OnInit ,Input } from '@angular/core';
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
})
export class LabComponent implements OnInit {
inputtransactionData(id) {
   this.TransactionData(id)
    }
	private td_id;
	constructor() { }
	ngOnInit(){
	  }
   private TransactionData(id){
	 this.td_id=id;
	 //console.log(this.td_id);
    }
}

