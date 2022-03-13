import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModule } from 'apollo-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditYourEmailComponent } from './edit-your-email.component';

describe('EditYourEmailComponent', () => {
  let component: EditYourEmailComponent;
  let fixture: ComponentFixture<EditYourEmailComponent>;
  const module = {
    declarations: [EditYourEmailComponent],
    imports: [
      ApolloModule,
      MatInputModule,
      MatSnackBarModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(EditYourEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
