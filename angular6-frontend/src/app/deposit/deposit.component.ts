import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { DepositAccount } from '../deposit-account';
import { DepositService } from '../deposit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private depositService: DepositService,
              private router: Router) { }

  ngOnInit() {
  }

  postDeposit(account_number: string, customer_name: string, user_acc: string,
    trx_number: string, amount: number): void {
    account_number = account_number.trim();
    customer_name = customer_name.trim();
    user_acc = user_acc.trim();
    trx_number = trx_number.trim();
    amount = +amount;
    const deposit_accounts: DepositAccount[] = [
      {trx_number: `${trx_number}`, amount: amount, acc_number: ''}
    ]
    this.depositService.postDeposit({account_number, customer_name, user_acc, deposit_accounts} as Customer)
      .subscribe(data => {
        this.router.navigateByUrl("/cash_deposit");
        this.customers.push(data);
      })
  }

}
