import { Component, OnInit } from '@angular/core';
import { AccountService } from '@core/shared/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public loadingAccount: boolean;

  public constructor(private accountService: AccountService) {
    this.loadingAccount = true;
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.setAccount();
    this.loadingAccount = false;
  }
}
