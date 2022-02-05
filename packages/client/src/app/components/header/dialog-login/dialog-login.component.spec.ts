import { ApolloModule } from 'apollo-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DialogLoginComponent } from './dialog-login.component';

describe('DialogLoginComponent', () => {
  let component: DialogLoginComponent;
  let fixture: ComponentFixture<DialogLoginComponent>;
  const module = {
    declarations: [
      DialogLoginComponent,
    ],
    imports: [
      ApolloModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatInputModule,
      MatFormFieldModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
    ],
    providers: [
      {
        provide: MatDialogRef,
        useValue: {},
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(DialogLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loginForm with null values', () => {
    const { email, password } = component.loginForm.getRawValue();

    expect(email).toEqual(null);
    expect(password).toEqual(null);
  });
});
