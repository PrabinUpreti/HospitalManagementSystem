import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { TransactionComponent } from './lab/transaction/transaction.component';

import { DashboardComponent } from './lab/dashboard/dashboard.component';
import { TestBookingComponent } from './lab/test-booking/test-booking.component';
import { AuthuserGuard } from './auth/authuser.guard';
// import {AuthuserService} from './auth/authuser.service';
// import { TransactionComponent } from './transaction/transaction.component';
// import { ReportsComponent } from './reports/reports.component';
// import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { LabComponent } from './lab/lab.component';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
   	{path:'login', component: LoginComponent},
    {path:'lab', component: LabComponent },
  // { path: 'lab/dashboard', component: DashboardComponent },
  // { path: '**', component: TransactionComponent },
  // { path: 'lab/test-booking', component: TestBookingComponent },
  // { path: 'transaction', component: TransactionComponent },
  // { path: 'reports', component: ReportsComponent },  
  // { path: 'view-transaction', component: ViewTransactionComponent },
];

export const AppRouting = RouterModule.forRoot(appRoutes);