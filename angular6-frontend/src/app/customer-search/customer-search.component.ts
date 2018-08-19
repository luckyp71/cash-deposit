import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { Customer } from '../customer';
import { DepositService } from '../deposit.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit, AfterViewInit {
  customer: Customer;
  customers: Customer[];
  loading: boolean;
  displayedColumns = ['position', 'account_number', 'customer_name', 'user_acc'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private depositService: DepositService,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  // Get all transaction history of customers
  getCustomersTrasactionHistory(): void {
  this.depositService.getCustomersTrasactionHistory()
    .subscribe(data => {
      this.customers = data;
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
    });
 }

  // Get transaction history by account number
 getTHByAccountNumber(account_number: string): void {
   account_number = account_number.trim();
   this.loading = true;
   if(account_number === ''){
     this.getCustomersTrasactionHistory();
     this.loading = false;
   } else {
     this.depositService.getTHByAccountNumber(account_number)
      .subscribe(data => {
        this.customers = []
        this.customers.push(data)
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
      });
      this.loading = false;
   }
 }

 onRowClicked(account_number: string): void {
   this.router.navigateByUrl(`/cash_deposit/detail/${account_number}`);
 }

}
