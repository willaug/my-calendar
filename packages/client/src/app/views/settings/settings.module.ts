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
import { EditYourNameComponent } from './components/edit-your-name/edit-your-name.component';
import { EditYourEmailComponent } from './components/edit-your-email/edit-your-email.component';
import { EditYourLanguageComponent } from './components/edit-your-language/edit-your-language.component';
import { SettingsExpansionPanelComponent } from './components/settings-expansion-panel/settings-expansion-panel.component';

@NgModule({
  declarations: [
    SettingsComponent,
    EditYourNameComponent,
    EditYourEmailComponent,
    EditYourLanguageComponent,
    SettingsExpansionPanelComponent,
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
    MatExpansionModule,
  ],
})
export class SettingsModule { }
