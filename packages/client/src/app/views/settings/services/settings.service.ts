import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Account, AccountInput } from '@interfaces/account';
import { AccountApiService } from './api/account-api.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  public constructor(private accountApi: AccountApiService) { }

  public updateAccount(accountInput: AccountInput): Observable<Account> {
    return this.accountApi.updateAccount(accountInput);
  }
}
