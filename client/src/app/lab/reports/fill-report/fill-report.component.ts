
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReportService } from "../report.service";
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-fill-report',
    templateUrl: './fill-report.component.html',
    styleUrls: ['./fill-report.component.css'],
})
export class FillReportComponent implements OnInit {
    @Input() set inputgetReportvalue(id) {
        this.getReportvalue(id)
    }
    @Output() patientData = new EventEmitter<any>();
    @Output() transactionData = new EventEmitter<any>();
    patients = [];
    private submitButtonStatus = true;
    private alive = false;
    public UserInformation=[];
    public globalPatient;
    private status = false;
  

    constructor(private reportservice: ReportService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
    model: any = {};
    test='';
    reports =  this.fb.array([
        
    ])
    resultData = this.fb.group({
        reports:this.reports
    });
    ngOnInit() {
    }
    private responseData = null;
    addReport() {
        if (this.resultData.valid) {
            console.log("Form Submitted");
            this.submitButtonStatus = false
            let paramData: any = this.resultData.value;
            this.reportservice.getData(paramData).
                subscribe(
                (response) => {
                    this.responseData = response
                    console.log(this.responseData)
                    this.submitButtonStatus = true;
                },
                (error) => {
                  
               }
           )
        }
    }
    private getReportvalue(id) {
        let toArray=[];
        this.UserInformation=[];
        for(let i in this.reports)this.reports.removeAt(parseInt(i))
        this.resultData.controls.reports = this.reports 
        let control = <FormArray>this.resultData.controls.reports;
        this.reportservice.getReportData(id).subscribe(
            patients => {
            this.patients = patients
                this.globalPatient = patients.datas;
                console.log(this.patients)
                for(let i = 0; i < patients.datas.length; i++){
                       var age_below =patients.datas[i].age_group.match(/below/g);
                          var age_above =patients.datas[i].age_group.match(/above/g);
                     if(age_below == "below"){
                              let belowArray=[];
                              let below_age;
                              let Arrayname=[];
                              belowArray.push(patients.datas[i].age_group.split(" "));
                              for(let j = 0 ;j <belowArray.length;j++ ){
                                  Arrayname.push(belowArray[j][0] = "0",belowArray[j][1]);
                                  toArray.push(Arrayname)
                              }
                       }else if (age_above == "above"){
                             let aboveArray=[];
                             let above_age;
                             let nameArray=[];
                             aboveArray.push(patients.datas[i].age_group.split(" "));
                              for(let j = 0;j < aboveArray.length; j++){
                                  nameArray.push(aboveArray[j][0], aboveArray[j][1] = "200")
                                  toArray.push(nameArray)
                                 }                                
                       }else{
                           toArray.push(patients.datas[i].age_group.split("to"));
                      }
                 } 
                 console.log(toArray)
                   for(let i = 0; i < toArray.length; i++){          
                             if(toArray[i][0] < patients.datas[i].age && toArray[i][1] >= patients.datas[i].age){
                                  if(patients.datas[i].patient_gender === patients.datas[i].gender){
                                          this.UserInformation.push(patients.datas[i]);
                                          control.push(this.reportresult(patients.datas[i].result, patients.datas[i].reports_id, patients.datas[i].test_name,patients.datas[i].upper_bound,patients.datas[i].lower_bound,patients.datas[i].unit,patients.datas[i].testbooking_id))
                                         
                                   }
                             } 
                  this.patientData.emit(this.UserInformation)
                     } 
              });
      }
    reportresult(x, y, z, a, b, c, d) {
        return this.fb.group({
            result: [x],
            id: [y],
            test_name:[z],
            lower_bound:[a],
            upper_bound:[b],
            unit: [c],
            testbooking_id:[d]
        })
    }
    getMethod(){
        console.log('i ma global variable',this.globalPatient)
    for(let i = 0; i < this.globalPatient.length;i++){
         this.test=this.globalPatient[0].testbooking_id;
      }
      let testbooking_id = this.test;
      this.router.navigate(['lab/view-transaction',testbooking_id]);
   }
   print(): void{
       console.log('I am In');
       let printContents, popupWin;
       printContents = document.getElementById('printSection').innerHTML;
       popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
       popupWin.document.open();
       popupWin.document.write(`
          <html>
              <head>
                  <style>
                      //........Customized style.......
                  </style>
              </head>
                    <body onload="window.print();window.close()">${printContents}
              </body>
          </html>`
       );
       popupWin.document.close();
   }
}
