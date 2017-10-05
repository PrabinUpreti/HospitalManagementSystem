import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { ModifyService } from '../../modify/modify.service';

class DataTable {
  
    private dataTable = []
  
    public push(data){
      this.dataTable.push(data)
    }

    public splice(index,remove,data){
      if(data)
        this.dataTable.splice(index,remove,data)
      else
        this.dataTable.splice(index,remove)
    }
  
    public totalSum(){
      let sum = 0
      for(let i in this.dataTable){
        sum = sum + parseInt(this.dataTable[i].rate)
      }
      return sum
    }
    public getDataTables(){
      return this.dataTable
    }
  }





@Component({
  selector: 'app-selected-test',
  templateUrl: './selected-test.component.html',
  styleUrls: ['./selected-test.component.css']
})
export class SelectedTestComponent implements OnInit {


  public SelectedAge;
  public SelectedGender;
  public idOfTest =[];
  // @Output() throwSelectedTest = new EventEmitter<any>();
  @Input() set inputDropToSelectedNow(id){
    console.log(id);
    this.DropHereNow(id)
  }
  @Input() set inputCatchAge(id){
    this.SelectedAge = id;
    this.filterAgeAndGender();
  }
  @Input() set inputCatchGender(id){
    this.SelectedGender = id;
    this.filterAgeAndGender();
  }
  
  @Output() setToPatientDetials = new EventEmitter<any>();
  public aliveSelected = false;
  public aliveSelectedTable = false;
  public dataTables: DataTable;
  public tempData = [];
  public testName;
  public tempdataname;
  public totalPrice;
  public info = "Please Input Gender and Age in above form.";

  constructor(private modifyService: ModifyService) { }

  ngOnInit() {
    this.dataTables = new DataTable()
  }

  DropHereNow(data){
    if(data == undefined) return 0
    this.aliveSelected = true;
    if(!(this.SelectedGender && this.SelectedAge)){
      
      if(!(this.SelectedAge) && this.SelectedGender){
      this.aliveSelectedTable = false;
      this.info = 'This Age is not registered by Administrator.';
      return 0;
      }
      this.aliveSelectedTable = false;
      this.info = 'Please Input Gender and Age in above form.';
      return 0;
    }
    
    if(this.aliveSelectedTable){
      this.aliveSelectedTable = false;
    }
    if(data.checkActive){
      // this.idOfTest[data.name] = data.id;
      // console.log(this.idOfTest);
      let id = data.id;
      this.testName = data.name;
      this.modifyService.getTestDetails(id)
      .subscribe(
        (response)=>{
          // this.throwSelectedTest.emit(data.id);
          // console.log(response);
          this.tempData=response;
          // console.log(this.tempData);
          // console.log('this is name = ' + this.testName)
          // // this.dataTables['name'] =this.testName;
          // this.dataTables;
          for(let x in this.tempData){
            let AgeFromServer = this.tempData[x].age_group;
            let GenderFromServer = this.tempData[x].gender;
            let AgeFromComponent = this.SelectedAge;
            let GenderFromComponent  = this.SelectedGender;
            // console.log( AgeFromComponent +"<br>"+ AgeFromServer +"<br>"+ GenderFromComponent +"<br>"+ GenderFromServer);
            if(AgeFromComponent && GenderFromComponent){
              if(AgeFromServer == AgeFromComponent && GenderFromServer == GenderFromComponent){
              // console.log("Age and Gender Found")
              if(!(this.aliveSelectedTable)){
                this.aliveSelectedTable = true;
              }
              let stationData = this.tempData[x];
              stationData['name'] = data.name;
              this.dataTables.push(stationData);
              
              console.log(this.dataTables);
              break;
              }
              else{
                console.log("Age and Gender Not Found");
                this.info = "This Age or Gender is not registered by Administrator.";
                if(this.aliveSelectedTable){                  
                  this.aliveSelectedTable = false;
                }
              }
            }
            else{
              console.log('Undifined is Success');
              this.info = 'Please Input Gender and Age in above form.';
              if(this.aliveSelectedTable){                  
                this.aliveSelectedTable = false;
              }
            }
          }
          let tempPrice = 0;
          for(let price in this.dataTables){
            tempPrice += parseInt(this.dataTables[price].rate);
            this.totalPrice = tempPrice;
          }
        },
        (error)=>{
            console.log("Error in server")
        }
      );
    }
    else{
      // this.tempdataname = data.name;
      // let spliceHere;
      // spliceHere.push(JSON.parse(JSON.stringify(this.dataTables)));
      // for(let a in spliceHere){
      //   alert(a);
      //   console.log(spliceHere[a].name);
      //   console.log(spliceHere[a]);
      //   console.log(this.tempdataname);
      //   if(spliceHere[a].name.toUpperCase() == this.tempdataname.toUpperCase()){
      //     spliceHere.splice(parseInt(a),1);
      //     console.log(spliceHere);
      //     let stationSplice = [];
      //     stationSplice.push(spliceHere[a]);
      //     console.log(stationSplice);
      //     this.dataTables = stationSplice;
      //     // delete(this.dataTables[a]);
      //   }
      //   console.log(this.dataTables);
      // }
      // for(let a in this.dataTables){
      //   console.log(this.dataTables[a]);
      // }
      // if(!(this.idOfTest[data.name].value == data.id)){
      //   this.idOfTest.splice(this.idOfTest[data.name], 1);
      //   console.log(this.idOfTest);
        // let id = data.id;
        // this.testName = data.name;
        // this.modifyService.getTestDetails(id)
        // .subscribe(
        //   (response)=>{
        //     // this.throwSelectedTest.emit(data.id);
        //     console.log(response);
        //     this.tempData=response;
        //     // console.log('this is name = ' + this.testName)
        //     // // this.dataTables['name'] =this.testName;
        //     // this.dataTables;
        //     for(let x in this.tempData){
        //       let AgeFromServer = this.tempData[x].age_group;
        //       let GenderFromServer = this.tempData[x].gender;
        //       let AgeFromComponent = this.SelectedAge;
        //       let GenderFromComponent  = this.SelectedGender;
        //       console.log( AgeFromComponent +"<br>"+ AgeFromServer +"<br>"+ GenderFromComponent +"<br>"+ GenderFromServer);
        //       if(AgeFromComponent && GenderFromComponent){
                
        //         if(AgeFromServer == AgeFromComponent && GenderFromServer == GenderFromComponent){
        //         console.log("Age and Gender Found")
        //         this.aliveSelectedTable = true;
        //         this.dataTables = [];
        //         this.dataTables.push(this.tempData[x]);
        //         console.log(this.dataTables);
        //         break;
        //         }
        //         else{ 
        //           console.log("Age and Gender Not Found");
        //           this.info = "This Age or Gender is not registered by Administrator.";
        //           if(this.aliveSelectedTable){                  
        //             this.aliveSelectedTable = false;
        //           }
        //         }
        //       }
        //       else{
        //         console.log('Undifined is Success');
        //         this.info = 'Please Input Gender and Age in above form.';
        //         if(this.aliveSelectedTable){                  
        //           this.aliveSelectedTable = false;
        //         }
        //       }
        //     }
        //   },
        //   (error)=>{
        //       console.log("Error in server")
        //   }
        // );
      // }
    }



        
    




      // console.log(this.aliveSelected);
      // this.dataTables.push(data);
      // this.setToPatientDetials.emit(this.dataTables);
      // console.log(this.dataTables);
  }
  filterAgeAndGender(){
    for(let x in this.tempData){
      console.log(x);
      let AgeFromServer = this.tempData[x].age_group;
      let GenderFromServer = this.tempData[x].gender;
      let AgeFromComponent = this.SelectedAge;
      let GenderFromComponent  = this.SelectedGender;
      // console.log( AgeFromComponent +"<br>"+ AgeFromServer +"<br>"+ GenderFromComponent +"<br>"+ GenderFromServer);
      if(AgeFromComponent && GenderFromComponent){
        
        if(AgeFromServer == AgeFromComponent && GenderFromServer == GenderFromComponent){
        console.log("Age and Gender Found")
        this.aliveSelectedTable = true;
        this.dataTables = new DataTable;
        this.dataTables.push(this.tempData[x]);
        console.log(this.dataTables);
        break;
        }
        else{ 
          console.log("Age and Gender Not Found");
          this.aliveSelectedTable = false;
          this.info = "This Age or Gender is not registered by Administrator.";
        }
      }
      else{
        console.log('Undifined is Success');
        this.aliveSelectedTable = false;
        this.info = 'Please Input Gender and Age in above form.';
      }
      
    }
  }
}
