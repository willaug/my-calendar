import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';

import { Account } from '@interfaces/index';
import { TokenService } from '../token/token.service';
import { AccountApiService } from './api/account-api.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  public account: Subject<Account | null>;

  public constructor(
    private accountApiService: AccountApiService,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
  ) {
    this.account = new Subject<Account | null>();
  }

  public getAccount(): Observable<Account | null> {
    return this.account;
  }

  public async setAccount(): Promise<void> {
    const token = this.tokenService.getToken();
    const isValidToken = this.tokenService.isValidToken();
    if (!token || !isValidToken) {
      this.account.next(null);
      return;
    }

    try {
      const response = await lastValueFrom(this.accountApiService.account(token));
      this.account.next(response);
    } catch (err: any) {
      this.account.next(null);
      this.snackBar.open('An error occurred, please try again later!', 'Ok', { duration: 4000 });
    }
  }

  public resetAccount(): void {
    this.account.next(null);
  }
}
