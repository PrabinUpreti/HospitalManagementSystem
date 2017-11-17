import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestBookingComponent } from './test-booking/test-booking.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { FillReportComponent } from './reports/fill-report/fill-report.component';
import { CheckbuttonComponent } from './reports/checkbutton/checkbutton.component';
import { TestbookingTransactionComponent } from './testbooking-transaction/testbooking-transaction.component'
// import { ComponentComponent } from './component/component.component';
import { SearchreportsComponent } from './reports/searchreports/searchreports.component';
import { PatientDetailsFormComponent } from './test-booking/patient-details-form/patient-details-form.component';
import { SearchWindowComponent } from './test-booking/search-window/search-window.component';
import { SelectTestypeComponent } from './test-booking/select-testype/select-testype.component';
import { SelectTestComponent } from './test-booking/select-test/select-test.component';
// import { SelectedTestComponent } from './test-booking/selected-test/selected-test.component';
import { SelectDepartmentComponent } from './test-booking/select-department/select-department.component';
import { ModifyComponent } from './modify/modify.component';
import { LabComponent } from './lab.component'
import { AuthuserGuard } from './../auth/authuser.guard';
import { UserComponent } from './user/user.component'
// import { SessionComponent } from './session/session.component';
import { RedirectJunctionComponent } from './redirect-junction/redirect-junction.component';
import { DoctorReportComponent } from './doctor-report/doctor-report.component';
import { ReportTransactionComponent } from './report-transaction/report-transaction.component';


const usersRoutes: Routes = [
    { path: 'lab', component: LabComponent,
      canActivate:[AuthuserGuard],
    	children: [
              { path: 'dashboard', component: DashboardComponent},
      				{ path: 'test-booking', component: TestBookingComponent },
              { path: 'view-transaction', component:ViewTransactionComponent},
              { path: 'reports', component: ReportsComponent },
              { path: 'test', component: DashboardComponent },
              { path: 'modify', component: ModifyComponent },
      				{ path: 'report-transaction/:id', component: ReportTransactionComponent },
              { path: 'add-transaction', component: TransactionComponent },
      				{ path: 'testbooking-transaction/:id', component: TestbookingTransactionComponent },
              // { path: 'view-transaction/:id', component:ViewTransactionComponent},
              { path: 'user', component: UserComponent },
              { path: 'doctor-report', component: DoctorReportComponent },
              // {path: '**', component: PageNotFoundComponent} 
              { path: 'redirecting/:id', component:RedirectJunctionComponent}
				]

    //    },
    // ]
  }
];

export const UsersRouting = RouterModule.forChild(usersRoutes);