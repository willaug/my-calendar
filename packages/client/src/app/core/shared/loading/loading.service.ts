import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  public isLoading: Subject<boolean>;

  public constructor() {
    this.isLoading = new Subject<boolean>();
  }

  public getLoading(): Observable<boolean> {
    return this.isLoading;
  }

  public setLoading(): void {
    this.isLoading.next(true);
  }

  public resetLoading(): void {
    this.isLoading.next(false);
  }
}
