import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavBarService {
  public navbarState: Subject<boolean>;

  public constructor() {
    this.navbarState = new Subject<boolean>();
  }

  public getNavBarState(): Observable<boolean> {
    return this.navbarState;
  }

  public setNavbarState(state: boolean): void {
    this.navbarState.next(state);
  }
}
