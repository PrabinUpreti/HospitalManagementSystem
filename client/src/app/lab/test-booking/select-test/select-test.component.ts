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
  selector: 'app-select-test',
  templateUrl: './select-test.component.html',
  styleUrls: ['./select-test.component.css']
})
export class SelectTestComponent implements OnInit {

  public SelectedAge;
  public SelectedGender;
  
  @Input() set inputSelectedtest(id){
    this.getTestFromServer(id)
  }
  @Input() set inputCatchAge(id){
    this.SelectedAge = id;
    this.filterAgeAndGender();
  }
  @Input() set inputCatchGender(id){
    this.SelectedGender = id;
    this.filterAgeAndGender();
  }

  @Output() dragToSelected = new EventEmitter<any>();
  // @Output() throwSelectedTest = new EventEmitter<any>();

  public alive = false;
  public checkSelected = [];
  public active;
  public idForForm = [];
  public testTables = [];
  public aliveSelected = false;
  public aliveSelectedTable = false;
  public dataTables: DataTable;
  public tempData = [];
  public testName;
  public tempdataname;
  public totalPrice;  
  public Notify = false;
  public notify;
  public info = "Please Input Gender and Age in above form.";

  constructor(private modifyService: ModifyService) { }

  ngOnInit() {
    this.dataTables = new DataTable()
  }
  getTestFromServer(id){
    if(id == undefined) return 0
    this.alive = true;
        this.modifyService.getTest(id)
        .subscribe(
          (response)=>{
            console.log(response);
            let stationResponse = [];
            let testIdFromLocalStorage = (JSON.parse(localStorage.getItem('test')));
            console.log(testIdFromLocalStorage);
            for(let x in response){
              if(testIdFromLocalStorage){

                stationResponse.push(response[x]);
                stationResponse[x]['checkActive'] = false;

                for(let y in testIdFromLocalStorage){
                    if(response[x].id == testIdFromLocalStorage[y]){
                      // alert("i have stored data and with same value")
                      stationResponse[x]['checkActive'] = true;
                    }                    
                  }
                  
                  

                  // for(let z in testIdFromLocalStorage){
                  //   if(!(response[x].id == testIdFromLocalStorage[z])){
                  //     // alert("i have stored data and without same value")
                  //     stationResponse.push(response[x]);
                  //     stationResponse[x]['checkActive'] = false;
                  //   }
                  // }
                    
                }
                else{
                  // alert("i do not have any stored data")
                  stationResponse.push(response[x]);
                  stationResponse[x]['checkActive'] = false;
                  console.log(stationResponse);
                }
            }
            this.testTables = stationResponse;
            
            // this.testTables = response;
          },
          (error)=>{
              console.log("Error in server");
          }
        );
  }

  dragTr(data){
    console.log(data)
    let sendingData;
     












   
    if(!(this.SelectedGender && this.SelectedAge)){
      
      if(!(this.SelectedAge) && this.SelectedGender){
        this.aliveSelectedTable = false;     
        this.Notify = true;
        this.notify = 'This Age is not registered by Administrator.';
        return 0;
      }
      this.aliveSelectedTable = false;
      this.Notify = true;
      this.notify = 'Please Input Gender and Age in above form.';
      return 0;
    }
    else{
      if(!(data.checkActive)){
        let id = data.id;
        this.testName = data.name;
        this.modifyService.getTestDetails(id)
        .subscribe(
          (response)=>{
            if(response.length){
              this.tempData=response;
              for(let x in this.tempData){
                let AgeFromServer = this.tempData[x].age_group;
                let GenderFromServer = this.tempData[x].gender;
                let AgeFromComponent = this.SelectedAge;
                let GenderFromComponent  = this.SelectedGender;
                if(AgeFromComponent && GenderFromComponent){
                  if(AgeFromServer == AgeFromComponent && GenderFromServer == GenderFromComponent){
                  // if(!(this.aliveSelectedTable)){
                    this.aliveSelected = true;
                    this.aliveSelectedTable = true;
                  // }
                  let stationData = this.tempData[x];
                  stationData['name'] = data.name;
                  this.dataTables.push(stationData);
                  data.checkActive = true;
                  this.checkSelected.push(data.id);
                  localStorage.setItem('test', JSON.stringify(this.checkSelected));
                  console.log(this.checkSelected);
                  // ageRange.push(JSON.parse(JSON.stringify(this.ageGroupFromServer[i])))
                  console.log(this.dataTables);
                  break;
                  }
                  else{
                    console.log("Age and Gender Not Found");
                    this.Notify = true;
                    this.notify = "This Age or Gender is not registered by Administrator.";
                  }
                }
                else{
                  console.log('Undifined is Success');
                  this.Notify = true;
                  this.notify = 'Please Input Gender and Age in above form.';
                
                }
              }
            }
            else{
              this.Notify = true;
              this.notify = 'Sorry There is nothing in Database!';
            }
          },
          (error)=>{
              console.log("Error in server")
          }
        );
      }
    }
  }


  dataTablSplice(index , id){
    console.log(index);
    for(let x in this.testTables){
      if(this.testTables[x].id == index.test_id){
        this.dataTables.splice(id , 1 , null);
        this.testTables[x].checkActive = false;
        this.checkSelected.splice(this.checkSelected.indexOf(index.test_id), 1);
        localStorage.removeItem('test');
        localStorage.setItem('test', JSON.stringify(this.checkSelected));
      }
    }
  }

  filterAgeAndGender(){
    this.checkSelected = [];
    localStorage.removeItem('test');
    if((this.SelectedGender && this.SelectedAge)){
      this.Notify = true;
      this.notify = "All the selected data are cleared!"
    }
    for(let x in this.testTables){
      this.testTables[x].checkActive = false;
    }
    this.dataTables = new DataTable();
    this.aliveSelected = false;


  }
  
  datadismis(){
    console.log('Hide')
    this.Notify = false;
  }


}
