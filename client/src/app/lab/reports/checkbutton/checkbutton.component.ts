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
  public first_day;
  public array=[];
  constructor(private formBuilder: FormBuilder){}
    ngOnInit() {
      this.myForm = this.formBuilder.group({
        myDateRange: ['', Validators.required],
      });
      this.setDate();
      this.timeRange();
    }
  setDate():void{
    let date = new Date();
    let day=date.getDate();
    let temp=day-1;
    let final=day-temp;
    let mouth=date.getMonth() + 1;
    let year= date.getFullYear();
    this.myForm.setValue({myDateRange: {
        beginDate:{   
            year: year,
            month: mouth,
            day: final
        },
        endDate: {  
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }});
  }
  setDateRange(): void { 
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
      let param={};
      //console.log('i am Date Piker',this.myForm.controls.myDateRange.value)
      if(this.myForm.controls.myDateRange.value){
          if(this.myForm.controls.myDateRange.value.formatted){
          let dateRange = this.myForm.controls.myDateRange.value.formatted.split(' - ');
          //console.log('I ma splite data',dateRange)
                param['startDate']=dateRange[0];
                param['endDate']=dateRange[1] + " 23:59:59";
                //console.log(param)
                this.DateRange.emit(param)
          }else{
               let date = new Date();
               let day=date.getDate();
               let temp=day-1;
               let final=day-temp;

               let mouth=date.getMonth() + 1;
               let year= date.getFullYear();
               if(final<10){
                    this.first_day='0'+final;
               }else{
                    this.first_day=final;
               }
               var beginDate = year+'-'+mouth+'-'+this.first_day;
               var endDate = year+'-'+mouth+'-'+day;
               param['startDate']=beginDate;
               param['endDate']=endDate + " 23:59:59";
               //console.log(param)
               this.DateRange.emit(param)
              
           }
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

