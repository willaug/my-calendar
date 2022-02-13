import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';

import { Account } from '@interfaces/index';
import { TokenService } from '../token/token.service';
import { AccountApiService } from './api/account-api.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  public account: Subject<Account | null>;

  public constructor(
    private accountApiService: AccountApiService,
    private snackBarService: SnackBarService,
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
      this.snackBarService.openUnknownError();
    }
  }

  public resetAccount(): void {
    this.tokenService.removeToken();
    this.account.next(null);
  }
}
