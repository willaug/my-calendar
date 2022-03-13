import { MatSelectModule } from '@angular/material/select';
import { ApolloModule } from 'apollo-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditYourLanguageComponent } from './edit-your-language.component';

describe('EditYourLanguageComponent', () => {
  let component: EditYourLanguageComponent;
  let fixture: ComponentFixture<EditYourLanguageComponent>;
  const module = {
    declarations: [EditYourLanguageComponent],
    imports: [
      ApolloModule,
      MatSelectModule,
      MatSnackBarModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditYourLanguageComponent],
    })
      .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(EditYourLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
