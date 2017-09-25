import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ModifyService } from '../../modify/modify.service';

@Component({
  selector: 'app-select-test',
  templateUrl: './select-test.component.html',
  styleUrls: ['./select-test.component.css']
})
export class SelectTestComponent implements OnInit {

  @Input() set inputSelectedtest(id){
    this.getTestFromServer(id)
  }

  @Output() dragToSelected = new EventEmitter<any>();
  // @Output() throwSelectedTest = new EventEmitter<any>();

  public alive = false;
  public checkSelected = [];
  public active;
  public idForForm = [];
  testTables = [];

  constructor(private modifyService: ModifyService) { }

  ngOnInit() {
  }
  getTestFromServer(id){
    if(id == undefined) return 0
    this.alive = true;
        this.modifyService.getTest(id)
        .subscribe(
          (response)=>{
            console.log(response);
            let stationResponse = [];
            for(let x in response){
              stationResponse.push(response[x]);
              stationResponse[x]['checkActive'] = false;
              console.log(stationResponse);
            }
            this.testTables = stationResponse;
            
            this.testTables = response;
          },
          (error)=>{
              console.log("Error in server");
          }
        );
  }

  dragTr(index){
    let sendingData;
    if(!(index.checkActive)){
      index.checkActive = true;
      this.idForForm.push(index.id)
      console.log(this.idForForm);
      console.log(index);
      this.dragToSelected.emit(index)
    // this.selectedtestcomponent.getSomeResponse(index)
    //   .subscribe(
    //     response =>{
    //       console.log(response);
    //     }
    //   );
    }
    // else{
    //   index.checkActive =false;
    //   this.idForForm.splice(index.id , 1)
    //   console.log(this.idForForm);
    //   this.dragToSelected.emit(index)
    // }
    // console.log(index);
    // this.dragToSelected.emit(index)
  }

}
