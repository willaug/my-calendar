import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApolloModule } from 'apollo-angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYourNameComponent } from './edit-your-name.component';

describe('EditYourNameComponent', () => {
  let component: EditYourNameComponent;
  let fixture: ComponentFixture<EditYourNameComponent>;
  const module = {
    declarations: [EditYourNameComponent],
    imports: [
      ApolloModule,
      MatInputModule,
      MatSnackBarModule,
      MatFormFieldModule,
      BrowserAnimationsModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(EditYourNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
