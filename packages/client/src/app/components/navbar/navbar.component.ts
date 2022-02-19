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
  public readonly navbarOptions: NavbarOption[] = [
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
