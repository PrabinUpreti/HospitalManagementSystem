import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ModifyService } from '../../modify/modify.service';


@Component({
  selector: 'app-select-testype',
  templateUrl: './select-testype.component.html',
  styleUrls: ['./select-testype.component.css']
})
export class SelectTestypeComponent implements OnInit {

  @Output() selectedtestype = new EventEmitter<any>();

  @Input() set inputSelectedDep(id){
    this.getDepFromServer(id)
  }

  public alive =false;
  // public testType;

  public testypes;
  public className;
  public startLoading = true;


  constructor(private modifyService: ModifyService) { }

  ngOnInit() {
    this.startLoading=true;
  }
  
  public getDepFromServer(id){
    if(id == undefined) return 0
        this.modifyService.getTestType(id)
        .subscribe(
          (response)=>{
            console.log(response);
            this.testypes = response;
            this.startLoading =false;
          },
          (error)=>{
              console.log("Error in server");
              this.startLoading=false;
          }
        );

      this.alive =true;
      this.className = undefined;
      // for(let i in this.testypes){
      //   if(this.testypes[i].id==id){
      //     this.testType=this.testypes[i].names
      //   }
      // }



    // this.patientData.controls.patientId.setValue(id)
}

pushtestype(index){
  this.className = index;
  console.log(index);
  let id = this.testypes[index].id;
  console.log('this is id = '+id);
  this.selectedtestype.emit(id);
}

}
