import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DepositService } from '../deposit.service';
import { Customer } from '../customer';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit, AfterViewInit {

  customers: Customer[];
  displayedColumns = ['position', 'account_number', 'customer_name', 'user_acc'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private depositService: DepositService,
              private router: Router) { }

  ngOnInit() {
    this.getCustomersTrasactionHistory();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getCustomersTrasactionHistory(): void {
    this.depositService.getCustomersTrasactionHistory()
      .subscribe(data => {
        this.customers = data
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
      });
  }


  onRowClicked(account_number: string): void {
    this.router.navigateByUrl(`/cash_deposit/detail/${account_number}`);
  }

}
