import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '@src/app/core/interfaces';
import { lastValueFrom } from 'rxjs';

import { AccountService } from '@core/shared/account/account.service';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public account: Account | null = null;

  public constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
  ) { }

  public ngOnInit(): void {
    this.getAccountData();
  }

  public async openLoginDialog(): Promise<void> {
    const loginDialogAfterClosed = await lastValueFrom(this.dialog.open(DialogLoginComponent, {
      width: '80%',
      maxWidth: '450px',
    }).afterClosed());

    if (loginDialogAfterClosed) {
      await this.accountService.setAccount();
      this.getAccountData();
    }
  }

  private getAccountData(): void {
    this.accountService.getAccount().subscribe((account: Account | null) => {
      this.account = account;
      if (this.account && this.account.name && !this.account.photoPath) {
        this.account.photoPath = this.generateAccountAvatarUrl(this.account.name);
      }
    });
  }

  private generateAccountAvatarUrl(accountName: string): string {
    const searchParams = new URLSearchParams({
      'font-size': '0.40',
      background: 'f3f3f3',
      name: accountName,
      rounded: 'true',
      format: 'svg',
      length: '1',
      size: '40',
    });

    return `https://ui-avatars.com/api/?${searchParams}`;
  }
}
