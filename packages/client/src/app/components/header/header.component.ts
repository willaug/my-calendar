import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account, AnyObject } from '@interfaces/index';
import { lastValueFrom } from 'rxjs';

import { AccountService } from '@core/shared/account/account.service';
import { NavBarService } from '@core/shared/nav-bar/nav-bar.service';
import { DialogSignUpComponent } from './dialog-sign-up/dialog-sign-up.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public account: Account | null = null;
  public showNavBar: boolean = false;

  public constructor(
    private dialog: MatDialog,
    private navbarService: NavBarService,
    private accountService: AccountService,
  ) { }

  public ngOnInit(): void {
    this.getAccountData();
    this.getNavbarState();
  }

  private getNavbarState(): void {
    this.navbarService.getNavBarState().subscribe((navbarState: boolean) => {
      this.showNavBar = navbarState;
    });
  }

  @HostListener('window:resize', ['$event'])
  private setNavbarState(): void {
    if (window.innerWidth > 959) {
      this.navbarService.setNavbarState(true);
    }
  }

  public toggleNavBar(): void {
    this.navbarService.setNavbarState(!this.showNavBar);
  }

  public async openLoginDialog(data?: AnyObject): Promise<void> {
    const loginDialogAfterClosed = await lastValueFrom(this.dialog.open(DialogLoginComponent, {
      width: '80%',
      maxWidth: '450px',
      data: { ...data },
    }).afterClosed());

    if (loginDialogAfterClosed) {
      await this.accountService.setAccount();
      this.getAccountData();
    }
  }

  public async openSignUpDialog(): Promise<void> {
    const email = await lastValueFrom(this.dialog.open(DialogSignUpComponent, {
      width: '80%',
      maxWidth: '450px',
    }).afterClosed());

    if (email) {
      this.openLoginDialog({ email });
    }
  }

  public logout(): void {
    this.accountService.resetAccount();
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
