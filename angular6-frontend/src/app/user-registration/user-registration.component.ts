import { Component, OnInit } from '@angular/core';
import { BankUser } from '../bank-user';
import { DepositService } from '../deposit.service';
import { Router } from '@angular/router';
import { Customer } from '../customer';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  // bankUsers: BankUser[] = [];
  constructor(private depositService: DepositService,
              private router: Router) { }

  ngOnInit() {
  }

  createBankOfficer(user_account: string, user_name: string, password: string): void {
    user_account = user_account.trim();
    user_name = user_name.trim();
    password = password.trim();
    this.depositService.createBankOfficer({user_account, user_name, password} as BankUser)
      .subscribe(data => {
        this.router.navigateByUrl("/cash_deposit");
        // this.bankUsers.push(data);
      });
  }

}
