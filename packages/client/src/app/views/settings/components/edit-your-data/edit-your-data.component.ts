import {
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { AccountLanguageEnum, AccountInput, EditYourDataType } from '@interfaces/index';
import { LoadingService } from '@core/shared/loading/loading.service';
import { AccountService } from '@core/shared/account/account.service';
import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-your-data',
  templateUrl: './edit-your-data.component.html',
  styleUrls: ['./edit-your-data.component.scss'],
})
export class EditYourDataComponent implements OnInit {
  @Output() public closeAccordion: EventEmitter<boolean>;
  @Input() public data?: AccountLanguageEnum | string | null;
  @Input() public dataType: EditYourDataType | null;
  @Input() public maxLength: number | null;
  @Input() public minLength: number | null;
  @Input() public selectOptions: any[];
  @Input() public isRequired: boolean;
  @Input() public isEmail: boolean;
  @Input() public isSelect: boolean;
  @Input() public inputPlaceholder: string | null;
  @Input() public inputTitle: string | null;
  public dataForm: FormControl;
  public savingData: boolean;

  public constructor(
    private settingsService: SettingsService,
    private snackBarService: SnackBarService,
    private accountService: AccountService,
    private loadingService: LoadingService,
  ) {
    this.data = null;
    this.inputTitle = null;
    this.isEmail = false;
    this.dataType = null;
    this.maxLength = null;
    this.isSelect = false;
    this.minLength = null;
    this.inputPlaceholder = null;
    this.selectOptions = [];
    this.isRequired = false;
    this.savingData = false;
    this.dataForm = new FormControl();
    this.closeAccordion = new EventEmitter();
  }

  public ngOnInit(): void {
    this.dataForm.setValue(this.data);

    if (this.isEmail) this.dataForm.addValidators(Validators.email);
    if (this.isRequired) this.dataForm.addValidators(Validators.required);
    if (this.minLength) this.dataForm.addValidators(Validators.minLength(this.minLength));
    if (this.maxLength) this.dataForm.addValidators(Validators.maxLength(this.maxLength));
  }

  public closePanel(): void {
    this.closeAccordion.emit(true);
  }

  public async saveData(): Promise<void> {
    this.loadingService.setLoading();
    this.dataForm.disable();
    this.savingData = true;

    const input = {} as AccountInput;
    if (this.dataType) input[this.dataType] = this.dataForm.value.trim();

    try {
      await lastValueFrom(this.settingsService.updateAccount(input));
      await this.accountService.setAccount();

      this.dataForm.enable();
      setTimeout(() => this.closePanel());
    } catch (err) {
      this.dataForm.enable();

      if (JSON.stringify(err).includes('BAD_USER_INPUT')) {
        this.dataForm.setErrors({ email: true });
        return;
      }

      if (JSON.stringify(err).includes('ACCOUNTS_EMAIL_UNIQUE')) {
        this.dataForm.setErrors({ emailUnique: true });
        return;
      }

      this.snackBarService.openUnknownError();
      setTimeout(() => this.closePanel());
    } finally {
      this.loadingService.resetLoading();
      this.savingData = false;
    }
  }
}
