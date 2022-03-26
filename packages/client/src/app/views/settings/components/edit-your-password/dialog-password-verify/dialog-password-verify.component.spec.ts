import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApolloModule } from 'apollo-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordVerifyComponent } from './dialog-password-verify.component';

describe('DialogPasswordVerifyComponent', () => {
  let component: DialogPasswordVerifyComponent;
  let fixture: ComponentFixture<DialogPasswordVerifyComponent>;
  const module = {
    declarations: [DialogPasswordVerifyComponent],
    imports: [
      ApolloModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatSnackBarModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
    ],
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(DialogPasswordVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
