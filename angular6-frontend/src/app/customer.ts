import { DepositAccount } from './deposit-account';

export interface Customer {
  account_number: string;
  customer_name: string;
  user_acc: string;
  deposit_accounts: DepositAccount[];
}
