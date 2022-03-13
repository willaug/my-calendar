import {
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { LoadingService } from '@core/shared/loading/loading.service';
import { AccountService } from '@core/shared/account/account.service';
import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-your-email',
  templateUrl: './edit-your-email.component.html',
  styleUrls: ['./edit-your-email.component.scss'],
})
export class EditYourEmailComponent implements OnInit {
  @Output() public closeAccordion: EventEmitter<boolean>;
  @Input() public email?: string | null;
  public emailForm: FormControl;
  public savingEmail: boolean;

  public constructor(
    private settingsService: SettingsService,
    private snackBarService: SnackBarService,
    private accountService: AccountService,
    private loadingService: LoadingService,
  ) {
    this.email = null;
    this.savingEmail = false;
    this.emailForm = new FormControl(null, [Validators.required, Validators.email]);
    this.closeAccordion = new EventEmitter();
  }

  public ngOnInit(): void {
    this.emailForm.setValue(this.email);
  }

  public closePanel(): void {
    this.closeAccordion.emit(true);
  }

  public async saveEmail(): Promise<void> {
    this.loadingService.setLoading();
    this.emailForm.disable();
    this.savingEmail = true;

    const input = {
      email: this.emailForm.value.trim(),
    };

    try {
      await lastValueFrom(this.settingsService.updateAccount(input));
      await this.accountService.setAccount();

      this.emailForm.enable();
      setTimeout(() => this.closePanel());
    } catch (err: any) {
      this.emailForm.enable();

      if (JSON.stringify(err).includes('BAD_USER_INPUT')) {
        this.emailForm.setErrors({ email: true });
        return;
      }

      if (JSON.stringify(err).includes('ACCOUNTS_EMAIL_UNIQUE')) {
        this.emailForm.setErrors({ emailUnique: true });
        return;
      }

      this.snackBarService.openUnknownError();
      setTimeout(() => this.closePanel());
    } finally {
      this.loadingService.resetLoading();
      this.savingEmail = false;
    }
  }
}
