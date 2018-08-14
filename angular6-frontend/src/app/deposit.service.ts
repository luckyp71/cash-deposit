import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BankUser } from './bank-user'
import { Customer } from './customer';
import { DepositAccount } from './deposit-account';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DepositService {

  // Service Base Path
  private depositServiceUrl = "http://localhost:8080/cash_deposit";

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
  return this.http.get<Customer[]>(this.depositServiceUrl).
  pipe(
    tap(_ => this.log(`Get transaction history of all customers`)),
    catchError(this.handleError<Customer[]>('Get transaction history of all customers', []))
  );
}

  // User (bank officer / user) Registration
  createBankOfficer(bo: BankUser): Observable<BankUser> {
  return this.http.post<BankUser>(this.depositServiceUrl, BankUser, httpOptions)
    .pipe(
      tap((bu: BankUser) => this.log(`Create new bank officer with account no: ${bu.user_account}`)),
      catchError(this.handleError<BankUser>('create bank officer'))
    )
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
