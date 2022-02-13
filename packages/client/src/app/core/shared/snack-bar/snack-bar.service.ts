import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  public constructor(private snackBar: MatSnackBar) { }

  public open(message: string, buttonText: string, duration?: number): void {
    this.snackBar.open(message, buttonText, { duration: duration || 4000 });
  }

  public openUnknownError(duration?: number): void {
    this.open('An error occurred, please try again later!', 'Ok', duration);
  }
}
