import { Component, OnInit } from '@angular/core';
import { Account } from '@core/interfaces/account';
import { AccountService } from '@core/shared/account/account.service';
import { LoadingService } from '@core/shared/loading/loading.service';
import { fadeInAnimation } from '@core/animations/fade-in.animation';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [fadeInAnimation],
})
export class SettingsComponent implements OnInit {
  public account: Account | null;
  public languageOptions: any[];

  public constructor(
    private accountService: AccountService,
    private loadingService: LoadingService,
  ) {
    this.account = null;
    this.loadingService.setLoading();
    this.accountService.getAccount().subscribe((account) => {
      this.loadingService.resetLoading();
      this.account = account;
    });

    this.languageOptions = [
      {
        text: 'English',
        value: 'en',
      },
      {
        text: 'Brazilian Portuguese',
        value: 'pt_br',
      },
    ];
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.setAccount();
  }
}
