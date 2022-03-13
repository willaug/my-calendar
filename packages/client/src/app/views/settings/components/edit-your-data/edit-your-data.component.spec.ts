import { ApolloModule } from 'apollo-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYourDataComponent } from './edit-your-data.component';

describe('EditYourDataComponent', () => {
  let component: EditYourDataComponent;
  let fixture: ComponentFixture<EditYourDataComponent>;
  const module = {
    declarations: [
      EditYourDataComponent,
    ],
    imports: [
      ApolloModule,
      MatInputModule,
      MatSelectModule,
      MatFormFieldModule,
      MatSnackBarModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(EditYourDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
