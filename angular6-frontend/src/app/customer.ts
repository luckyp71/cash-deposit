import { DepositAccount } from './deposit-account';

export class Customer {
  account_number: string;
  customer_name: string;
  user_acc: string;
  deposit_accounts: DepositAccount[];
}
