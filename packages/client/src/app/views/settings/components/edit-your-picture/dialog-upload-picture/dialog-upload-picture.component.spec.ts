import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadPictureComponent } from './dialog-upload-picture.component';

describe('DialogUploadPictureComponent', () => {
  let component: DialogUploadPictureComponent;
  let fixture: ComponentFixture<DialogUploadPictureComponent>;
  const module = {
    declarations: [
      DialogUploadPictureComponent,
    ],
    imports: [
      MatIconModule,
      MatDialogModule,
      FlexLayoutModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(DialogUploadPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
