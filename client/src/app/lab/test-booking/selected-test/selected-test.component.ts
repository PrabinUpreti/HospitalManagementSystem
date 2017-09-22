import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { ModifyService } from '../../modify/modify.service';

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
  public alive = false;
  public aliveTable = false;
  public dataTables=[];
  public tempData = [];
  public testName;
  public info = "Please Input Gender and Age in above form.";

  constructor(private modifyService: ModifyService) { }

  ngOnInit() {
  }

  DropHereNow(data){
    
    if(data == undefined) return 0
    this.alive = true;
    this.aliveTable = false;
    if(!(this.idOfTest[data.name])){
      this.idOfTest[data.name] = data.id;
      console.log(this.idOfTest);
      let id = data.id;
      this.testName = data.name;
      this.modifyService.getTestDetails(id)
      .subscribe(
        (response)=>{
          // this.throwSelectedTest.emit(data.id);
          console.log(response);
          this.tempData=(response);
          console.log(this.tempData);
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
              this.aliveTable = true;
              this.dataTables = [];
              this.dataTables.push(this.tempData[x]);
              console.log(this.dataTables);
              break;
              }
              else{ 
                console.log("Age and Gender Not Found");
                this.info = "This Age or Gender is not registered by Administrator.";
                this.aliveTable = false;
              }
            }
            else{
              console.log('Undifined is Success');
              this.info = 'Please Input Gender and Age in above form.';
              this.aliveTable = false;
            }
          }
        },
        (error)=>{
            console.log("Error in server")
        }
      );
    }
    else{
      if(!(this.idOfTest[data.name].value == data.id)){
        this.idOfTest.splice(this.idOfTest[data.name], 1);
        console.log(this.idOfTest);
        let id = data.id;
        this.testName = data.name;
        this.modifyService.getTestDetails(id)
        .subscribe(
          (response)=>{
            // this.throwSelectedTest.emit(data.id);
            console.log(response);
            this.tempData=response;
            // console.log('this is name = ' + this.testName)
            // // this.dataTables['name'] =this.testName;
            // this.dataTables;
            for(let x in this.tempData){
              let AgeFromServer = this.tempData[x].age_group;
              let GenderFromServer = this.tempData[x].gender;
              let AgeFromComponent = this.SelectedAge;
              let GenderFromComponent  = this.SelectedGender;
              console.log( AgeFromComponent +"<br>"+ AgeFromServer +"<br>"+ GenderFromComponent +"<br>"+ GenderFromServer);
              if(AgeFromComponent && GenderFromComponent){
                
                if(AgeFromServer == AgeFromComponent && GenderFromServer == GenderFromComponent){
                console.log("Age and Gender Found")
                this.aliveTable = true;
                this.dataTables = [];
                this.dataTables.push(this.tempData[x]);
                console.log(this.dataTables);
                break;
                }
                else{ 
                  console.log("Age and Gender Not Found");
                  this.info = "This Age or Gender is not registered by Administrator.";
                  this.aliveTable = false;
                }
              }
              else{
                console.log('Undifined is Success');
                this.info = 'Please Input Gender and Age in above form.';
                this.aliveTable = false;
              }
            }
          },
          (error)=>{
              console.log("Error in server")
          }
        );
      }
    }



        
    




      // console.log(this.alive);
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
        this.aliveTable = true;
        this.dataTables = [];
        this.dataTables.push(this.tempData[x]);
        console.log(this.dataTables);
        break;
        }
        else{ 
          console.log("Age and Gender Not Found");
          this.aliveTable = false;
          this.info = "This Age or Gender is not registered by Administrator.";
        }
      }
      else{
        console.log('Undifined is Success');
        this.aliveTable = false;
        this.info = 'Please Input Gender and Age in above form.';
      }
      
    }
  }
}
