import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BankUser } from './bank-user'
import { Customer } from './customer';
import { DepositAccount } from './deposit-account';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class DepositService {

  // Service Base Path
  private depositServiceUrl = "http://localhost:8080/cash_deposit";

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private handleError<T>(operator = 'operator', result?: T){
    return (error: any): Observable<T> => {
      console.error(`$error`);
      this.log(`operator = ${operator} found ${error.messages}`)
      return of(result as T);
    }
  }

  private log(message: string): void {
      this.messageService.add(message);
  }

}
