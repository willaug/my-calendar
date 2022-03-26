import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditYourPasswordComponent } from './edit-your-password.component';

describe('EditYourPasswordComponent', () => {
  let component: EditYourPasswordComponent;
  let fixture: ComponentFixture<EditYourPasswordComponent>;
  const module = {
    declarations: [EditYourPasswordComponent],
    imports: [
      MatInputModule,
      MatFormFieldModule,
      MatDialogModule,
      MatIconModule,
      MatSnackBarModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(EditYourPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
