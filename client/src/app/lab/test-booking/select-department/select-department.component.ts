import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { ModifyService } from '../../modify/modify.service';

@Component({
  selector: 'app-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.css']
})
export class SelectDepartmentComponent implements OnInit {

  @Output() selectedDep = new EventEmitter<any>();
  public departments=[];
  public idForTestType;
  public  className;
  public startLoading=true;
  
  constructor(private modifyService: ModifyService) { }

  ngOnInit() {
    this.startLoading=true;
    localStorage.removeItem('test');
    localStorage.removeItem('sum');
    localStorage.removeItem('testDetails');
    this.modifyService.getDepartment()
    .subscribe(
      (response)=>{
        console.log (response);
        this.departments = response;
        this.startLoading=false;
      },
      (error)=>{
          console.log("Error in server")
      }
  )

}
  pushdepartment(index){
    this.className = index;
    console.log(index);
    this.idForTestType = this.departments[index].id;
    console.log(this.idForTestType);
    this.selectedDep.emit(this.idForTestType);
  }

}
