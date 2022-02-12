import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApolloModule } from 'apollo-angular';
import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloModule,
        MatSnackBarModule,
      ],
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
