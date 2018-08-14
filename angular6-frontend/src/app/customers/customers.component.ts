import { Component, OnInit } from '@angular/core';
import { DepositService } from '../deposit.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];

  constructor(private depositService: DepositService) { }

  ngOnInit() {
    this.getCustomersTrasactionHistory();
  }

  getCustomersTrasactionHistory(): void {
    this.depositService.getCustomersTrasactionHistory()
      .subscribe(data => this.customers = data);
  }

}
