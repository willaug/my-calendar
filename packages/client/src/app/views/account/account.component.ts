import { Component, OnInit } from '@angular/core';
import { Account, AccountDataList } from '@core/interfaces/account';
import { AccountService } from '@core/shared/account/account.service';
import { LoadingService } from '@core/shared/loading/loading.service';
import { AccountLanguageEnumToName } from '@src/app/core/functions/enum-to-name';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public account: Account | null;
  public accountDataList: AccountDataList[];

  public constructor(
    private accountService: AccountService,
    private loadingService: LoadingService,
  ) {
    this.account = null;
    this.loadingService.setLoading();
    this.accountDataList = [
      {
        title: 'Full name',
        icon: 'face',
      },
      {
        title: 'E-mail',
        icon: 'alternate_email',
      },
      {
        title: 'Language',
        icon: 'language',
      },
      {
        title: 'Created at',
        isDate: true,
        icon: 'add',
      },
      {
        title: 'Updated at',
        isDate: true,
        icon: 'edit',
      },
    ];

    this.accountService.getAccount().subscribe((account: Account | null) => {
      this.account = account;
      this.accountDataList[0].data = account?.name;
      this.accountDataList[1].data = account?.email;
      this.accountDataList[2].data = AccountLanguageEnumToName[String(account?.language)];
      this.accountDataList[3].data = account?.createdAt;
      this.accountDataList[4].data = account?.updatedAt;

      this.loadingService.resetLoading();
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.setAccount();
  }
}
