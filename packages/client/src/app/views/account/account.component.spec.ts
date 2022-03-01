import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModule } from 'apollo-angular';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  const module = {
    declarations: [
      AccountComponent,
    ],
    imports: [
      ApolloModule,
      MatCardModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(module).compileComponents();
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
