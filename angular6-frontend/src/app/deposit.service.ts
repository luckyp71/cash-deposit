import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BankUser } from './bank-user'
import { Customer } from './customer';
import { DepositAccount } from './deposit-account';
import { Result } from './result';
import { UserAccount } from './user-account';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DepositService {

  // Service Base Path
  private depositServiceUrl = "http://192.168.77.40:8080/cash_deposit";

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  // Handle error
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(`$error`);
      this.log(`${operation} failed ${error.messages}`)
      return of(result as T);
    }
  }

  // Log
  private log(message: string): void {
      this.messageService.add(message);
  }

  // Get transaction history of Customers
  getCustomersTrasactionHistory(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.depositServiceUrl)
      .pipe(
          tap(_ => this.log(`Get transaction history of all customers`)),
          catchError(this.handleError<Customer[]>('Get transaction history of all customers', []))
        );
}

  // Get transaction history by account Number
  getTHByAccountNumber(account_number: string): Observable<Customer> {
    const url = `${this.depositServiceUrl}/detail/${account_number}`;
    return this.http.get<Customer>(url)
      .pipe(
        tap(_ => this.log(`Get customer's transaction history by account number: ${account_number}`)),
        catchError(this.handleError<Customer>(`Get customer's transaction history by account number`))
      );
}

  // Get total balance of customer by account number
  getTotalBalanceByAccountNumber(account_number: string): Observable<Result> {
    const url = `${this.depositServiceUrl}/balance/${account_number}`;
    return this.http.get<Result>(url).
      pipe(
        tap(_ => this.log(`Get total balance by account number`)),
      catchError(this.handleError<Result>(`Get total balance by account number`))
    );
}

// Get Bank Officer's User account
  getUserAccount(): Observable<UserAccount[]> {
   const url = `${this.depositServiceUrl}/users/user_account`;
   return this.http.get<UserAccount[]>(url)
    .pipe(
      tap(_ => this.log(`Get user accunts`)),
      catchError(this.handleError<UserAccount[]>(`Get user accounts`))
    );
}

  // User (bank officer / user) Registration
  createBankOfficer(bo: BankUser): Observable<BankUser> {
  const url = `${this.depositServiceUrl}/users`;
  return this.http.post<BankUser>(url, bo, httpOptions)
    .pipe(
      tap((bu: BankUser) => this.log(`Create new bank officer with account no: ${bo.user_account}`)),
      catchError(this.handleError<BankUser>('create bank officer'))
    );
}

  // Post Deposit
  postDeposit(customer: Customer): Observable<Customer> {
  return this.http.post<Customer>(this.depositServiceUrl, customer, httpOptions)
    .pipe(
      tap((customer: Customer) => this.log(`New deposit from account number ${customer.account_number}`)),
      catchError(this.handleError<Customer>('Deposit'))
    );
}



}
