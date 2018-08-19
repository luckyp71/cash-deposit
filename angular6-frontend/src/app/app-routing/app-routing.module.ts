import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from '../customers/customers.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { DepositComponent } from '../deposit/deposit.component';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';

const routes: Routes = [
  {path: 'cash_deposit', component: CustomersComponent},
  {path: 'cash_deposit/detail/:account_number', component: CustomerDetailComponent},
  {path: 'cash_deposit/deposit', component: DepositComponent},
  {path: 'cash_deposit/registration', component: UserRegistrationComponent},
  {path: 'cash_deposit/search', component: CustomerSearchComponent},
  {path: '', redirectTo: 'cash_deposit', pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
