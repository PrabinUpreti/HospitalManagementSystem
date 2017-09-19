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
  @Input() set inputDropToSelectedNow(id){
    this.DropHereNow(id)
  }
  @Input() set inputCatchAge(id){
    this.SelectedAge = id;
  }
  @Input() set inputCatchGender(id){
    this.SelectedGender = id;
  }
  
  @Output() setToPatientDetials = new EventEmitter<any>();
  public alive = false;
  public dataTables=[];
  public testName;

  constructor(private modifyService: ModifyService) { }

  ngOnInit() {
  }

  DropHereNow(data){
    
    if(data == undefined) return 0
    this.alive = true;
    let id = data.id;
    this.testName = data.name;
        this.modifyService.getTestDetails(id)
        .subscribe(
          (response)=>{
            console.log(response);
            for(let x in response){
              
            }
            this.dataTables = response;
            console.log('this is name = ' + this.testName)
            // this.dataTables['name'] =this.testName;
            this.dataTables;
          },
          (error)=>{
              console.log("Error in server")
          }
        );
      // console.log(this.alive);
      // this.dataTables.push(data);
      // this.setToPatientDetials.emit(this.dataTables);
      // console.log(this.dataTables);
  }
}
