import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from '../customers/customers.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { DepositComponent } from '../deposit/deposit.component';

const routes: Routes = [
  {path: 'cash_deposit', component: CustomersComponent},
  {path: 'cash_deposit/:account_number', component: CustomerDetailComponent},
  {path: 'cash_deposit/deposit', component: DepositComponent},
  {path: '', redirectTo: 'cash_deposit', pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
