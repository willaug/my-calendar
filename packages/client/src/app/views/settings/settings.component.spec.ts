import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApolloModule } from 'apollo-angular';

import { SettingsExpansionPanelComponent } from './components/settings-expansion-panel/settings-expansion-panel.component';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  const module = {
    declarations: [
      SettingsComponent,
      SettingsExpansionPanelComponent,
    ],
    imports: [
      ApolloModule,
      MatIconModule,
      MatSnackBarModule,
      MatExpansionModule,
      BrowserAnimationsModule,
      MatProgressSpinnerModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
