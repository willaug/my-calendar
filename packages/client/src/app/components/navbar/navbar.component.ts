import { NavBarService } from '@core/shared/nav-bar/nav-bar.service';
import { Component } from '@angular/core';

interface NavbarOption {
  title: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public readonly navbarOptions: NavbarOption[];

  public constructor(private navbarService: NavBarService) {
    this.navbarOptions = [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        url: '',
      },
      {
        title: 'Calendar',
        icon: 'today',
        url: 'calendar',
      },
      {
        title: 'Your account',
        icon: 'person',
        url: 'account',
      },
      {
        title: 'Settings',
        icon: 'settings',
        url: 'settings',
      },
    ];
  }

  public closeNavbar(): void {
    if (window.innerWidth < 959) {
      this.navbarService.setNavbarState(false);
    }
  }
}
