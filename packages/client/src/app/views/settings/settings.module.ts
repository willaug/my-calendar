import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { EditYourDataComponent } from './components/edit-your-data/edit-your-data.component';
import { EditYourPasswordComponent } from './components/edit-your-password/edit-your-password.component';
import { SettingsExpansionPanelComponent } from './components/settings-expansion-panel/settings-expansion-panel.component';
import { DialogPasswordVerifyComponent } from './components/edit-your-password/dialog-password-verify/dialog-password-verify.component';

@NgModule({
  declarations: [
    SettingsComponent,
    EditYourDataComponent,
    EditYourPasswordComponent,
    SettingsExpansionPanelComponent,
    DialogPasswordVerifyComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
  ],
})
export class SettingsModule { }
