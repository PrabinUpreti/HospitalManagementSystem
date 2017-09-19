
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
    public globalPatient;


    constructor(private reportservice: ReportService, private fb: FormBuilder) { }
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
            console.log(paramData)
            this.reportservice.getData(paramData).
                subscribe(
                (response) => {
                    this.responseData = response
                    this.responseData.controls.reports.setValue('');
                    this.submitButtonStatus = true;
                },
                (error) => {
                    this.submitButtonStatus = false;
                    console.log("sorry error in server");
               }
           )
        }
    }
    private getReportvalue(id) {
        for(let i in this.reports)this.reports.removeAt(parseInt(i))
        this.resultData.controls.reports = this.reports 
        let control = <FormArray>this.resultData.controls.reports;
        this.reportservice.getReportData(id).subscribe(
            patients => {
            this.patients = patients
                this.globalPatient = patients.datas;
                console.log(patients.datas)
                for (let i = 0; i < patients.datas.length; i++) {
                    control.push(this.reportresult(patients.datas[i].result, patients.datas[i].reports_id, patients.datas[i].test_name, patients.datas[i].upper_bound, patients.datas[i].lower_bound, patients.datas[i].unit, patients.datas[i].testbooking_id))
                }
                this.patientData.emit(patients)
            });
      }
    reportresult(x, y, z, a, b, c, d) {
        return this.fb.group({
            result: [x],
            id: [y],
            test_name:[z],
            lower_bound:[a],
            upper_bound:[b],
            unit:[c],
            testbooking_id:[d]
        })
    }
    getMethod(){
    for(let i = 0; i < this.globalPatient.length;i++){
         this.test=this.globalPatient[0].testbooking_id;
      }
     this.transactionData.emit(this.test)
     console.log(this.test)
   }
}
