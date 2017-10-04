import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{ TransactionService } from './transaction.service';
import { ModifyService } from './../modify/modify.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  constructor(private transactionservice:TransactionService, private ModifyService: ModifyService) { }
  
  public SearchPayment : FormGroup;
  public patientDatas=[];
  public patientDatasDetails = [];
  public commoncodes = [];
  public notify;
  public Notify = false;
  public ageGroupFromServer =[];
  public throwage;
  public genderinPatientTable;
  ngOnInit() {
    this.SearchPayment = new FormGroup({
      Search_name:new FormControl('', Validators.required)
    })
    this.ModifyService.commoncodes() .subscribe(
      (response)=>{
        if(response.length == 0){
          this.Notify = true;
          this.notify = "There is no any Data ";
        }
        console.log(response);
        this.commoncodes = response;


        // for(let x in response){
        //   if(response[x].common_code.toUpperCase() == 'GEN'){
        //     if(this.genderInDropdowns == undefined){
        //       this.genderInDropdowns = response[x].common_description;
        //     }
        //     else{
        //       this.genderInDropdowns.push(response[x].common_description);
        //     }
        //   }
        // }



        // for(let x in response){
        //   if(response[x].common_code.toUpperCase() == 'MRT'){
        //     if(this.mrts == undefined){
        //       this.mrts = response[x].common_description;
        //     }
        //     else{
        //       this.mrts.push(response[x].common_description);
        //     }
        //   }
        // }



        // let tempData;
        for(let x in response){
          if(response[x].common_code.toUpperCase() == 'AGP'){
            if(this.ageGroupFromServer == undefined){
              // tempData = [
              //   {age_group:response[x].common_description, enable:1},
              // ]
              this.ageGroupFromServer = response[x].common_description;
            }
            else{
              // tempData.push({age_group:response[x].common_description, enable:1})
              this.ageGroupFromServer.push(response[x].common_description);
            }
          }
          // this.age_groupInDropdown = tempData;
        }



        
        // console.log(this.FormUnits , this.genderInDropdowns, this.age_groupInDropdown)
      },
      (error)=>{
          console.log("sorry error in server")
          this.Notify = true;
          this.notify = "Sorry couldn't load data from server please refresh it."
      });
  }
  // private getTestbookingID() {
  //       this.transactionreport.getbillData(1).subscribe(
  //           billData => {
  //           this.billData = billData 
  //           console.log(billData);
  //        });
  //     }
  searchpayment(){
    let id = this.SearchPayment.controls.Search_name.value;
    this.transactionservice.getPatientTest(id)
    .subscribe(
      (response)=>{
        console.log(response);
        this.genderinPatientTable = response[0].gender;
        // this.patientDatas = response;
        
        let ageRange = [];
        for(let i in this.ageGroupFromServer) ageRange.push(JSON.parse(JSON.stringify(this.ageGroupFromServer[i])))
        console.log(ageRange);
        let splitAge = [];
        for(let x in ageRange){
          splitAge.push(ageRange[x].split(" "));
        }
        console.log(splitAge);
        let changeInNum
        let intCollection=[];
        for(let y in splitAge){
          for( let z = 0; z <= splitAge[y].length-1; z++){
            changeInNum = splitAge[y][z];
            if(parseInt(changeInNum)){
              intCollection.push(parseInt(changeInNum));
            }
            else{
              if(intCollection.length < 1 ){
                intCollection.push(0);
              }
              else if(splitAge[parseInt(y)].length < 3){
                intCollection.push(200);
              }
            }
            // console.log((changeInNum));
            // if(changeInNum.toUpperCase() ==  )
          }
        }
        console.log(intCollection);
        console.log("this is int list")
        for(let int = 0; int < intCollection.length; int+=2){
          console.log(int);
          let term = response[0].age;
          if(term < 200){
            if(term >=intCollection[int] && term <= intCollection[int+1]){
              if(intCollection[int] == 0){
                this.throwage="below "+ intCollection[int+1].toString();
              }
              else if (intCollection[int+1] == 200){
                this.throwage = intCollection[int].toString() + " above";
              }
              else if (intCollection[int] != 0 && intCollection[int+1] != 200){
                this.throwage = intCollection[int].toString() + " to "+ intCollection[int+1];
              }
          }
        }
        // console.log(intCollection[int] , intCollection[int+1]);
      }

      this.patientDatas = [];
      for(let i in response){
        // if(response[i].age_group.toUpperCase() == this.throwage.toUpperCase() && response[i].gender.toUpperCase() == response[i].genderdetails.toUpperCase() ){
          this.patientDatas.push(response[i]);
        // }
      }
      console.log(this.patientDatas);

      },
      (error)=>{
          console.log("sorry error in server")
      });
  }
  invoice(){
    this.patientDatasDetails = [];
    for (let i in this.patientDatas) {
      let idToGetTest = this.patientDatas[i].testbookings_id;
      this.transactionservice.getDetialsOfPatients(idToGetTest)
        .subscribe(
        (response) => {
          console.log(response);
          for (let i in response) {
            if (response[i].age_group.toUpperCase() == this.throwage.toUpperCase() && this.genderinPatientTable.toUpperCase() == response[i].genderdetails.toUpperCase()) {
              this.patientDatasDetails.push(response[i]);
            }
          }
          console.log(this.patientDatasDetails);
        },
        (error) => {
          console.log("sorry error in server")
        });
    }
    
}


  datadismis(){
    console.log('Hide')
    this.Notify = false;
  }
}
