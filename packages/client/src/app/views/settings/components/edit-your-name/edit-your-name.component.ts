import {
  EventEmitter,
  Component,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SnackBarService } from '@core/shared/snack-bar/snack-bar.service';
import { FormControl, Validators } from '@angular/forms';
import { LoadingService } from '@core/shared/loading/loading.service';
import { AccountService } from '@core/shared/account/account.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-your-name',
  templateUrl: './edit-your-name.component.html',
  styleUrls: ['./edit-your-name.component.scss'],
})
export class EditYourNameComponent implements OnInit {
  @Output() public closeAccordion: EventEmitter<boolean>;
  @Input() public name?: string | null;
  public nameForm: FormControl;
  public savingName: boolean;

  public constructor(
    private settingsService: SettingsService,
    private snackBarService: SnackBarService,
    private accountService: AccountService,
    private loadingService: LoadingService,
  ) {
    this.name = null;
    this.savingName = false;
    this.closeAccordion = new EventEmitter();
    this.nameForm = new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]);
  }

  public ngOnInit(): void {
    this.nameForm.setValue(this.name);
  }

  public closePanel(): void {
    this.closeAccordion.emit(true);
  }

  public async saveName(): Promise<void> {
    this.loadingService.setLoading();
    this.nameForm.disable();
    this.savingName = true;

    const input = {
      name: this.nameForm.value.trim(),
    };

    try {
      await lastValueFrom(this.settingsService.updateAccount(input));
      await this.accountService.setAccount();
    } catch {
      this.snackBarService.openUnknownError();
    } finally {
      this.loadingService.resetLoading();
      this.savingName = false;
      this.nameForm.enable();
      setTimeout(() => this.closePanel());
    }
  }
}
