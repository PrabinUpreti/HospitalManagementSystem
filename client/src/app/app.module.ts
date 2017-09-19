import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpModule } from "@angular/http";
import { LabModule } from './lab/lab.module';


import { AppComponent } from './app.component';
import { MainMenuComponent } from './lab/menu/main-menu/main-menu.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { TestBookingComponent } from './test-booking/test-booking.component';
import { TransactionComponent } from './lab/transaction/transaction.component';
// import { ReportsComponent } from './reports/reports.component';
// import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
// import { FillReportComponent } from './reports/fill-report/fill-report.component';
// import { CheckbuttonComponent } from './reports/checkbutton/checkbutton.component';
// import { SearchreportsComponent } from './reports/searchreports/searchreports.component';
// import { PatientDetailsFormComponent } from './lab/test-booking/patient-details-form/patient-details-form.component';
// import { SearchWindowComponent } from './test-booking/search-window/search-window.component';
// import { SelectTestypeComponent } from './test-booking/select-testype/select-testype.component';
// import { SelectTestComponent } from './test-booking/select-test/select-test.component';
// import { SelectedTestComponent } from './test-booking/selected-test/selected-test.component';
// import { SelectDepartmentComponent } from './test-booking/select-department/select-department.component';
// import { ComponentComponent } from './component/component.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    // DashboardComponent,
    // TestBookingComponent,
    TransactionComponent,
    // ReportsComponent,
    // ViewTransactionComponent,
    // FillReportComponent,
    // CheckbuttonComponent,
    // // ComponentComponent,
    // SearchreportsComponent,
    // PatientDetailsFormComponent,
    // SearchWindowComponent,
    // SelectTestypeComponent,
    // SelectTestComponent,
    // SelectedTestComponent,
    // SelectDepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LabModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
