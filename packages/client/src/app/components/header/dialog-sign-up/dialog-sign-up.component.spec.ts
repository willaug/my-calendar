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

import { DialogSignUpComponent } from './dialog-sign-up.component';

describe('DialogSignUpComponent', () => {
  let component: DialogSignUpComponent;
  let fixture: ComponentFixture<DialogSignUpComponent>;
  const module = {
    declarations: [
      DialogSignUpComponent,
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
    fixture = TestBed.createComponent(DialogSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have signUpForm with null values', () => {
    const { name, email, password } = component.signUpForm.getRawValue();

    expect(name).toEqual(null);
    expect(email).toEqual(null);
    expect(password).toEqual(null);
  });
});
