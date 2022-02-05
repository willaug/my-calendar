import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './header.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const module = {
    declarations: [
      HeaderComponent,
      DialogLoginComponent,
    ],
    imports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatDialogModule,
    ],
    exports: [
      HeaderComponent,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should create', () => {
    expect(component).toBeTruthy();
  });
});
