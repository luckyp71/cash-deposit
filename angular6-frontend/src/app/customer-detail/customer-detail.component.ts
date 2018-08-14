import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customer';
import { Result } from '../result';
import { DepositService } from '../deposit.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() customer: Customer;
  result: Result;
  constructor(private depositService: DepositService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.getTHByAccountNumber();
    this.GetTotalBalanceByAccountNumber();
  }

  getTHByAccountNumber(): void {
    const account_number = this.route.snapshot.paramMap.get('account_number');
    this.depositService.getTHByAccountNumber(account_number)
      .subscribe(data => this.customer = data);
  }

  GetTotalBalanceByAccountNumber(): void {
    const account_number = this.route.snapshot.paramMap.get('account_number');
    this.depositService.GetTotalBalanceByAccountNumber(account_number)
      .subscribe(data => this.result = data);
  }

}
