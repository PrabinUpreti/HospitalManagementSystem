import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestBookingComponent } from './test-booking/test-booking.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { FillReportComponent } from './reports/fill-report/fill-report.component';
import { CheckbuttonComponent } from './reports/checkbutton/checkbutton.component';
// import { ComponentComponent } from './component/component.component';
import { SearchreportsComponent } from './reports/searchreports/searchreports.component';
import { PatientDetailsFormComponent } from './test-booking/patient-details-form/patient-details-form.component';
import { SearchWindowComponent } from './test-booking/search-window/search-window.component';
import { SelectTestypeComponent } from './test-booking/select-testype/select-testype.component';
import { SelectTestComponent } from './test-booking/select-test/select-test.component';
import { SelectedTestComponent } from './test-booking/selected-test/selected-test.component';
import { SelectDepartmentComponent } from './test-booking/select-department/select-department.component';
import { ModifyComponent } from './modify/modify.component';
import { DoctorReportComponent } from './doctor-report/doctor-report.component';


const usersRoutes: Routes = [
  { path: 'lab',
    // children: [
    //   { path: 'home',

      	children: [
      				{ path: '', component: DashboardComponent },
      				{ path: 'test-booking', component: TestBookingComponent },
              { path: 'reports', component: ReportsComponent },
              { path: 'test', component: DashboardComponent },
              { path: 'modify', component: ModifyComponent },
      				{ path: 'add-transaction/:id', component: TransactionComponent },
      				{ path: 'add-transaction', component: TransactionComponent },
              { path: 'view-transaction', component: ViewTransactionComponent },
              { path: 'doctor-reports', component: DoctorReportComponent },
              { path: 'help', component: ModifyComponent },
				]

    //    },
    // ]
  }
];

export const UsersRouting = RouterModule.forChild(usersRoutes);