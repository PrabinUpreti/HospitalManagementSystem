import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UsersRouting } from './lab.router';
import { LaravelService } from './test-booking/patient-details-form/laravel.service';
import { ReportService } from './reports/report.service';
import { ModifyService } from './modify/modify.service';
import { TransactionService } from './transaction/transaction.service';
import { DashboardService } from './dashboard/dashboard.service';
import { ViewTransactionService } from './view-transaction/view-transaction.service';
import { TestbookingTransactionService } from './testbooking-transaction/testbooking-transaction.service';
import { DoctorReportService } from './doctor-report/doctor-report.service';

import { MyDateRangePickerModule } from 'mydaterangepicker';



// import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestBookingComponent } from './test-booking/test-booking.component';
// import { TransactionComponent } from './transaction/transaction.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { FillReportComponent } from './reports/fill-report/fill-report.component';
import { CheckbuttonComponent } from './reports/checkbutton/checkbutton.component';
// import { ComponentComponent } from './component/component.component';
import { ReportsFormComponent } from './reports/reports-form/reports-form.component';
import { SearchreportsComponent } from './reports/searchreports/searchreports.component';
import { PatientDetailsFormComponent } from './test-booking/patient-details-form/patient-details-form.component';
import { SearchWindowComponent } from './test-booking/search-window/search-window.component';
import { SelectTestypeComponent } from './test-booking/select-testype/select-testype.component';
import { SelectTestComponent } from './test-booking/select-test/select-test.component';
// import { SelectedTestComponent } from './test-booking/selected-test/selected-test.component';
import { SelectDepartmentComponent } from './test-booking/select-department/select-department.component';
import { ModifyComponent } from './modify/modify.component';
import { ModifyDepComponent } from './modify/modify-dep/modify-dep.component';
import { ModifyTestTypeComponent } from './modify/modify-test-type/modify-test-type.component';
import { ModifyTestComponent } from './modify/modify-test/modify-test.component';
import { TestDetailsComponent } from './modify/test-details/test-details.component';
import { DoctorComponent } from './modify/doctor/doctor.component';
import { PatientComponent } from './modify/patient/patient.component';
import { DoctorReportComponent } from './doctor-report/doctor-report.component';
import { TestbookingTransactionComponent } from './testbooking-transaction/testbooking-transaction.component';
import { RedirectJunctionComponent } from './redirect-junction/redirect-junction.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	UsersRouting,
	MyDateRangePickerModule
  ],
  declarations: [
  					// MainMenuComponent,
  					DashboardComponent,
  					TestBookingComponent,
  					// TransactionComponent,    
  					ReportsComponent,
  					ViewTransactionComponent,
					  FillReportComponent,
					  ReportsFormComponent,
  					CheckbuttonComponent,
  					// ComponentComponent,
  					SearchreportsComponent,
  					PatientDetailsFormComponent,
  					SearchWindowComponent,
  					SelectTestypeComponent,
  					SelectTestComponent,
  					// SelectedTestComponent,
  					SelectDepartmentComponent,
  					ModifyComponent,
  					ModifyDepComponent,
  					ModifyTestTypeComponent,
  					ModifyTestComponent,
  					TestDetailsComponent,
  					DoctorComponent,
  					PatientComponent,
  					DoctorReportComponent,
  					TestbookingTransactionComponent,
  					RedirectJunctionComponent
  				],
  bootstrap: [TestBookingComponent],
  exports:[TestBookingComponent],
  providers:[
	  LaravelService,
	  ReportService,
	  ModifyService,
	  TransactionService,
	  DashboardService,
	  ViewTransactionService,
	  TestbookingTransactionService,
	  DoctorReportService
	]
})
export class LabModule {}
