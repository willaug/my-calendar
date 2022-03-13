import {
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { AccountLanguageEnum } from '@interfaces/account';
import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { LoadingService } from '@core/shared/loading/loading.service';
import { AccountService } from '@core/shared/account/account.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-your-language',
  templateUrl: './edit-your-language.component.html',
  styleUrls: ['./edit-your-language.component.scss'],
})
export class EditYourLanguageComponent implements OnInit {
  @Output() public closeAccordion: EventEmitter<boolean>;
  @Input() public language?: AccountLanguageEnum | null;
  public languageForm: FormControl;
  public savingLanguage: boolean;

  public constructor(
    private settingsService: SettingsService,
    private snackBarService: SnackBarService,
    private accountService: AccountService,
    private loadingService: LoadingService,
  ) {
    this.language = null;
    this.savingLanguage = false;
    this.languageForm = new FormControl(null, [Validators.required]);
    this.closeAccordion = new EventEmitter();
  }

  public ngOnInit(): void {
    this.languageForm.setValue(String(this.language));
  }

  public closePanel(): void {
    this.closeAccordion.emit(true);
  }

  public async saveLanguage(): Promise<void> {
    this.loadingService.setLoading();
    this.languageForm.disable();
    this.savingLanguage = true;

    const input = {
      language: this.languageForm.value.trim(),
    };

    try {
      await lastValueFrom(this.settingsService.updateAccount(input));
      await this.accountService.setAccount();
      setTimeout(() => this.closePanel());
    } catch {
      this.snackBarService.openUnknownError();
      setTimeout(() => this.closePanel());
    } finally {
      this.languageForm.enable();
      this.loadingService.resetLoading();
      this.savingLanguage = false;
    }
  }
}
