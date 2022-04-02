import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly defaultTitle: string;

  public constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) {
    this.defaultTitle = 'MyCalendar - Add important reminders!';
  }

  public setPageTitleOnChangedRoute(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute.firstChild),
        map((children) => children?.snapshot.firstChild?.data),
      )
      .subscribe((data) => {
        this.setTitle(data && data['title']);
      });
  }

  private setTitle(title?: string): void {
    this.titleService.setTitle(title || this.defaultTitle);
  }
}
