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

  public alive = false;

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
            this.testTables = response;
          },
          (error)=>{
              console.log("Error in server")
          }
        );
  }

  dragTr(index){
    console.log(index);
    this.dragToSelected.emit(index)
  }

}
