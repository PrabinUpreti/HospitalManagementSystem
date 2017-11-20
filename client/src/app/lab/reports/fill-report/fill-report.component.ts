
    import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
    import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
    import { ReportService } from "../report.service";
    import { ActivatedRoute, Params } from '@angular/router';
    import { Router } from '@angular/router';
    import { ENV } from "../../../env";
    declare var jQuery:any;

    @Component({
        selector: 'app-fill-report',
        templateUrl: './fill-report.component.html',
        styleUrls: ['./fill-report.component.css'],
    })
    export class FillReportComponent implements OnInit {
        @Input() set inputgetReportvalue(id) {
            this.getReportvalue(id)
        }
        @Input() set inputreadyReport(id){
            this.getReady(id)
          }
        @Output() patientData = new EventEmitter<any>();
        @Output() transactionData = new EventEmitter<any>();
        @Output() response_report = new EventEmitter<any>();
        @Output() Emiited_data = new EventEmitter<any>();
        patients = [];
        
        public submitButtonStatus = true;
        public alive = false;
        public UserInformation=[];
        public globalPatient;
        public status = false;
        public Save = "Save";
        public save = true;
        public Notify = false;
        public notify;
        public patient_info=[];
        public hospital_name:string;
        public hospital_address:string;
        public hospital_panNumber:string;
        public hospital_phoneNumber:string;
        public patient_name:string;
        public patient_address:string;
        public patient_gender:string;
        public nationality:string;
        public age:string;
        public date:string;
        public referred_by:string;
        public patient_Id:string;
        public check;
        public value=false;
        public testbooking_id;
        public Balance;
        public print_status=true;
        public patientId;
        public showTable=false;
        public prefix;
        public method
        // private hidemodel=false;
        constructor(private reportservice: ReportService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
        model: any = {};
        test='';
        Emitedvalue
        reports =  this.fb.array([
            
        ])
        resultData = this.fb.group({
            reports:this.reports
        });
        ngOnInit() {
            this.hospital_name=ENV.hospital;
            this.hospital_address=ENV.address;
            this.hospital_panNumber=ENV.pan_Number;
            this.hospital_phoneNumber=ENV.phone_number;
        }
        public responseData = null;
        addReport() {
            if (this.resultData.valid) {
                this.Save = "Saving..."
                this.save=true;
                this.showTable=false;
                //console.log("Form Submitted");
                this.submitButtonStatus = false
                let paramData: any = this.resultData.value;
                this.reportservice.getData(paramData).
                    subscribe(
                    (response) => {
                        this.response_report.emit(response)
                        this.Save = "Save";
                        this.save = false;
                        this.notify = "Successfully submitted report!";
                        this.Notify = true;
                        setTimeout(function() {
                            this.Notify = false;
                        }.bind(this), 3000);
                        this.responseData = response
                        //console.log('my response data',this.responseData)
                        this.submitButtonStatus = true;
                    },
                    (error) => {
                        this.Save = "Save";
                        this.save = false;
                        this.notify = "Unable to submit report!";
                })
            }
        }
        getReady(id){
            this.check=id;
            //console.log('checked',this.check)
             if(this.check===undefined) return 0
             if(this.check == 1){
                  this.value=true;         
                 this.getReportvalue(this.method)         
              }else{
                  this.value=false;
                  this.getReportvalue(this.method)  
              }
              this.showTable=false;
             //console.log('value',this.check)
        }
        public getReportvalue(data){
            if(data === undefined) return 0
            this.showTable=true;
            this.save=false;
            this.method=data
            this.print_status=false;
            //console.log('with key value ',data.id)
            let toArray=[];
            this.UserInformation=[];
            for(let i in this.reports)this.reports.removeAt(parseInt(i))
            this.resultData.controls.reports = this.reports 
            let control = <FormArray>this.resultData.controls.reports;
            this.reportservice.getReportData(data.id).subscribe(
                patients => {
                this.patients = patients
                if(this.patients !== undefined){
                    this.Emiited_data.emit(this.patients)
                 }
                 //console.log('Report data 130',this.patients)
                    this.globalPatient = patients.datas;
                    //console.log('patient data',this.patients)
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
                    //console.log(toArray)
                    for(let i = 0; i < toArray.length; i++){          
                                if(toArray[i][0] <= patients.datas[i].age && toArray[i][1] >= patients.datas[i].age){
                                    if(patients.datas[i].patient_gender === patients.datas[i].gender){
                                            this.UserInformation.push(patients.datas[i]);
                                            control.push(this.reportresult(patients.datas[i].result, patients.datas[i].reports_id, patients.datas[i].test_name,patients.datas[i].upper_bound,patients.datas[i].lower_bound,patients.datas[i].unit,patients.datas[i].testbooking_id)) 
                                        }
                                } 
                            this.patientData.emit(this.UserInformation)
                        } 
                    if(this.UserInformation.length == 0) return 0;
                       this.testbooking_id=this.UserInformation[0].testbooking_id;
                       this.patient_Id=this.UserInformation[0].reg_no;
                       this.patientId=this.UserInformation[0].patients_id;
                       this.patient_name=this.UserInformation[0].patient_name;
                       this.patient_address=this.UserInformation[0].patient_address;
                       this.patient_gender=this.UserInformation[0].patient_gender;
                       this.age=this.UserInformation[0].age;
                           let start_dd;
                           var today = new Date();
                           var end_dd = today.getDate();
                           var end_mm = today.getMonth()+1;
                           var end_yyyy =today.getFullYear();
                           if(end_dd<10){
                                 start_dd='0'+end_dd;
                           }else{
                                 start_dd=end_dd;
                           }
                           var end_date = end_yyyy+'-'+end_mm+'-'+start_dd
                       this.date=end_date;
                       this.nationality=this.UserInformation[0].nationality;
                       this.referred_by=this.UserInformation[0].doctor_name;
                       this.prefix = this.UserInformation[0].prefix;
                    let temp = this.UserInformation[0].test_type_name;
                    let flag:boolean = false;
                        for(let i = 0; i<this.UserInformation.length; i++) {
                            //console.log('I am test_type_name',this.UserInformation[i].test_type_name);  
                                if(temp === this.UserInformation[i].test_type_name){
                                    if(flag) {
                                            this.UserInformation[i].id = 0;
                                    } else {
                                            this.UserInformation[i].id = 1;
                                            flag = true;
                                    }
                                    } else {
                                        this.UserInformation[i].id = 1;
                                        temp = this.UserInformation[i].test_type_name
                                    }
                        }
                        for(let i = 0; i<this.UserInformation.length;i++){
                            if(this.UserInformation[i].upper_bound >= this.UserInformation[i].result && this.UserInformation[i].result<=this.UserInformation[i].upper_bound){
                                 this.UserInformation[i].result
                            }else{
                                this.UserInformation[i].result=this.UserInformation[i].result+'*';
                            }
                        }
                        //console.log('Reports data',this.UserInformation);
                     this.reportservice.getInvoice(this.patientId).subscribe(
                            response=>{
                                //console.log(response)
                                //console.log('Invoice data',response)
                                if(response.length > 0){
                                  //console.log('balance',response[0].balance)
                                  if(response[0].remark == 'dr'){
                                    //   if(!(response[0].particular == "INV-CREATED-REPORT-TR")){
                                        this.Balance=1;
                                    //   }
                                    //   else{
                                    //       this.Balance = 0;
                                    //   }
                                  }
                                  else{
                                      this.Balance = 0;
                                  }
                                }
                                  
                            });
                        //console.log('test',this.UserInformation)
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
            //console.log('i ma global variable',this.globalPatient)
        for(let i = 0; i < this.globalPatient.length;i++){
            this.test=this.globalPatient[0].patient_id;
        }
        let testbooking_id = this.test;
        jQuery("#myModel").modal("hide");
        this.router.navigate(['/lab/report-transaction',this.patient_Id]);
    }
    closeMethod(){
        jQuery("#myModel").modal("hide");
    }
    // modelHandle(){
    //     jQuery("#myModel").modal("hide");
    //     //console.log("hello this is modal")
    // }
    print(): void{
        //console.log(this.Balance)
        if(this.Balance != 0){
            jQuery("#myModel").modal("show");
        }
        else{
            jQuery("#myModel").modal("hide");
        }
        //console.log('I am In');
        // this.print_status=true;
        // this.save=true;
        let printContents, popupWin;
        printContents = document.getElementById('printSection').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
            <html>
                <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
                        <style>
                        body {
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.42857143;
                            color: #333;
                            background-color: #fff;
                        }
                        h1{
                            font-size:40px;
                        }
                        .patient_Info{
                            margin: 0 auto;
                        }
                        .container {
                            padding-right: 15px;
                            padding-left: 15px;
                            margin-right: auto;
                            margin-left: auto;
                        }
                        .header-report{
                            text-align: center;
                            
                        }
                        .row {
                            margin-right: -15px;
                            margin-left: -15px;
                        }
                        .col-md-12, .col-xs-12, .col-sm-12 {
                            width: 100%;
                            float: center;
                            position: relative;
                            min-height: 1px;
                            padding-right: 15px;
                            padding-left: 15px;
                        }
                
                        .col-md-2, .col-xs-2, .col-sm-2, .col-lg-2 {
                            width: 20%;
                            float: left;
                            position: relative;
                            min-height: 1px;
                            padding-right: 15px;
                            padding-left: 15px;
                        }
                        h3{
                            font-size: 19px;
                        }
                        ul{
                            list-style-type: none;
                        }
                        ul li{
                            list-style-type: none;
                        }

                        h3, h4 {
                            font-family: inherit;
                            font-weight: 700;
                            line-height: 1.1;
                            color: inherit;
                        }
                        .col-md-4, .col-xs-4, .col-sm-4, .col-lg-4{
                            width: 33%;
                            float: left;
                        }
                        .div-header-title{
                            text-align: center;
                            font-size: 40px; 
                        }
                        h4{
                            font-size: 18px;
                            text-align: center;
                            margin-top: 20px;
                            margin-bottom: 15px;
                            font-weight: 700;
                            line-height: 1.1;
                            font-family: inherit;
                            display: block;
                        }
                        .common-ulcss{
                            padding: 0px;
                            margin: 0px;
                            text-align: center;
                        }
                
                        .common-ulcss li{
                        list-style-type: none;
                        }/*
                        .div-content-particular .col-md-12 h4{
                            text-align: left;
                        }*/
                        .div-content-particular ul {
                            text-align: center;
                        }
                        .title-headr{
                            font-size: 30px;
                        }
                        .hidden-div{
                            margin-top: 10px;
                            text-align: center;
                            display: none;
                        } 
                        </style>
                </head>
                    <div>
                            
                    </div>

                        <body onload="window.print();window.close()">${printContents}
                </body>
                        <script src="assets/bootstrap/js/jquery.min.js"></script>
                        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            </html>`
        );
        popupWin.document.close();
    }
}
