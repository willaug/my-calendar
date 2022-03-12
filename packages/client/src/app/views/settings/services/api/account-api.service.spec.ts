import { ApolloModule } from 'apollo-angular';
import { TestBed } from '@angular/core/testing';

import { AccountApiService } from './account-api.service';

describe('AccountApiService', () => {
  let service: AccountApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloModule,
      ],
    });
    service = TestBed.inject(AccountApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
