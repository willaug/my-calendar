import { ApolloModule } from 'apollo-angular';
import { TestBed } from '@angular/core/testing';

import { DialogSignUpService } from './dialog-sign-up.service';

describe('DialogSignUpService', () => {
  let service: DialogSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloModule,
      ],
    });
    service = TestBed.inject(DialogSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
