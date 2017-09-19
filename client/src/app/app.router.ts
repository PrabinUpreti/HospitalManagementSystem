import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { TransactionComponent } from './lab/transaction/transaction.component';

import { DashboardComponent } from './lab/dashboard/dashboard.component';
// import { TestBookingComponent } from './test-booking/test-booking.component';
// import { TransactionComponent } from './transaction/transaction.component';
// import { ReportsComponent } from './reports/reports.component';
// import { ViewTransactionComponent } from './view-transaction/view-transaction.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'lab/dashboard', pathMatch: 'full' },
  { path: 'lab/dashboard', component: DashboardComponent },
  { path: '**', component: TransactionComponent },
  // { path: 'test-booking', component: TestBookingComponent },
  // { path: 'transaction', component: TransactionComponent },
  // { path: 'reports', component: ReportsComponent },  
  // { path: 'view-transaction', component: ViewTransactionComponent },
];

export const AppRouting = RouterModule.forRoot(appRoutes);