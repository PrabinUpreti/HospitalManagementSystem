  import { Component, OnInit, Output, EventEmitter } from '@angular/core';

  import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
  import { IMyDrpOptions } from 'mydaterangepicker';

  @Component({
    selector: 'app-checkbutton',
    templateUrl: './checkbutton.component.html',
    styleUrls: ['./checkbutton.component.css']
  })
  export class CheckbuttonComponent implements OnInit {
    myDateRangePickerOptions: IMyDrpOptions = {
      dateFormat: 'yyyy-mm-dd',
      editableDateRangeField:false,
      openSelectorOnInputClick:true,

  };
  @Output() DateRange = new EventEmitter<any>();
  @Output() readyBtn = new EventEmitter<any>();
  @Output() notreadyBtn = new EventEmitter<any>();
  public myForm: FormGroup;
  public test=false;
  public setclass=0;
  constructor(private formBuilder: FormBuilder){}
    ngOnInit() {
      this.myForm = this.formBuilder.group({
        myDateRange: ['', Validators.required],
      });
    }
    setDateRange(): void {
      // Set date range (today) using the setValue function
      let date = new Date();
      this.myForm.setValue({myDateRange: {
          beginDate: {   
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
          },
          endDate: {  
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
          }
      }});
    }
    clearDateRange(): void {
      this.myForm.setValue({myDateRange: ''});
    }
    timeRange(){
      if(this.myForm.controls.myDateRange.value){
          console.log(this.myForm.controls.myDateRange.value.formatted);
          let dateRange = this.myForm.controls.myDateRange.value.formatted.split(' - ');
          console.log('I ma splite data',dateRange)
          this.DateRange.emit(dateRange)
      }else{
          let name;
          this.DateRange.emit(name)
      } 
    }
  ready(){
  let id=1;
    this.setclass = 1;
    this.readyBtn.emit(id)
    }
  notready(){
  let id=0;
  this.setclass = 0;
    this.notreadyBtn.emit(id)
      }
  }

