import { Customer } from './customer';

export class BankUser {
  user_account: string;
  user_name: string;
  password: string;
  customers: Customer[];
}
