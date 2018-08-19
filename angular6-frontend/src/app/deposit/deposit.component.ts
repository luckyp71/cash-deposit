import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { DepositAccount } from '../deposit-account';
import { UserAccount } from '../user-account';
import { DepositService } from '../deposit.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  customers: Customer[] = [];
  user_accounts: UserAccount[];
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;


  constructor(private depositService: DepositService,
              private router: Router) { }

  ngOnInit() {
    this.getUserAccount()
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
        this.customers.push(data);
        this.router.navigateByUrl("/cash_deposit");
      })
  }

  private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(options => options.toLowerCase().includes(filterValue));
}

  getUserAccount(): void {
    this.depositService.getUserAccount()
      .subscribe(data => {
        this.user_accounts = data;
        for (let uc of data){
          this.options.push(uc.user_account)
        }
        for (let o of this.options){
            this._filter(o);
          }
          this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  });
  }


}
