import { Account } from '@interfaces/index';
import { MatDrawerMode } from '@angular/material/sidenav';
import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AccountService } from '@core/shared/account/account.service';
import { NavBarService } from '@core/shared/nav-bar/nav-bar.service';
import { routeAnimation } from '@core/animations/route.animation';
import { LoadingService } from '@core/shared/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routeAnimation],
})
export class AppComponent implements OnInit {
  public loading: boolean;
  public account: Account | null;
  public navbarOpened: boolean;
  public navbarMode: MatDrawerMode;

  public constructor(
    private accountService: AccountService,
    private loadingService: LoadingService,
    private navbarService: NavBarService,
  ) {
    this.account = null;
    this.loading = true;
    this.navbarMode = 'side';
    this.navbarOpened = false;

    this.loadingService.setLoading();
    this.loadingService.getLoading().subscribe((loading: boolean) => {
      this.loading = loading;
    });

    this.navbarService.getNavBarState().subscribe((navbarState: boolean) => {
      this.navbarOpened = navbarState;
    });

    this.accountService.getAccount().subscribe((account: Account | null) => {
      this.account = account;
      this.openNavbar();
      this.loadingService.resetLoading();
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.setAccount();
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
    if (window.innerWidth > 959) {
      this.navbarMode = 'side';
    } else {
      this.navbarMode = 'over';
    }
  }
}
