import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsExpansionPanelComponent } from './settings-expansion-panel.component';

describe('SettingsExpansionPanelComponent', () => {
  let component: SettingsExpansionPanelComponent;
  let fixture: ComponentFixture<SettingsExpansionPanelComponent>;
  const module = {
    declarations: [
      SettingsExpansionPanelComponent,
    ],
    imports: [
      BrowserAnimationsModule,
      MatExpansionModule,
      MatIconModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(SettingsExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
