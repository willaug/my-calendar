import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public constructor(private dialog: MatDialog) { }

  public openLoginDialog(): void {
    this.dialog.open(DialogLoginComponent, {
      width: '80%',
      maxWidth: '450px',
    });
  }
}
