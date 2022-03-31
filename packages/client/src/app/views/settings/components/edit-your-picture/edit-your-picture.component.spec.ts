import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ApolloModule } from 'apollo-angular';

import { EditYourPictureComponent } from './edit-your-picture.component';

describe('EditYourPictureComponent', () => {
  let component: EditYourPictureComponent;
  let fixture: ComponentFixture<EditYourPictureComponent>;
  const module = {
    declarations: [
      EditYourPictureComponent,
    ],
    imports: [
      ApolloModule,
      MatDialogModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatSnackBarModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(EditYourPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
