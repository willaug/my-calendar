import { Account } from '@interfaces/index';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AccountService } from '@core/shared/account/account.service';
import { NavBarService } from '@core/shared/nav-bar/nav-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loadingAccount: boolean;
  public account: Account | null = null;
  public navbarOpened: boolean = false;
  public navbarMode: MatDrawerMode = 'side';

  public constructor(
    private accountService: AccountService,
    private navbarService: NavBarService,
  ) {
    this.loadingAccount = true;
    this.navbarService.getNavBarState().subscribe((navbarState: boolean) => {
      this.navbarOpened = navbarState;
    });

    this.accountService.getAccount().subscribe((account: Account | null) => {
      this.account = account;
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.setAccount();

    this.loadingAccount = false;
    this.openNavbar();
    this.setNavbarMode();
  }

  private openNavbar(): void {
    if (!this.account) return;
    if (window.innerWidth > 959) {
      this.navbarService.setNavbarState(true);
    }
  }

  public closeNavbar(): void {
    this.navbarService.setNavbarState(false);
  }

  @HostListener('window:resize', ['$event'])
  private setNavbarMode(): void {
    if (!this.account) return;

    if (window.innerWidth > 959) {
      this.navbarMode = 'side';
    } else {
      this.navbarMode = 'over';
    }
  }
}
