import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsExpansionPanelComponent } from './components/settings-expansion-panel/settings-expansion-panel.component';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsExpansionPanelComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatExpansionModule,
  ],
})
export class SettingsModule { }
