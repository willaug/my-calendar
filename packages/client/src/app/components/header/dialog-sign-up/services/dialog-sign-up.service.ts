import { Injectable } from '@angular/core';
import { SignUp, SignUpResponse } from '@interfaces/index';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogSignUpService {
  public constructor(private apollo: Apollo) { }

  public signUp(signUpInput: SignUp): Observable<SignUpResponse> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createAccount($signUpInput: CreateAccountInput!) {
          createAccount(accountInput: $signUpInput) {
            email
          }
        }
      `,
      variables: {
        signUpInput,
      },
    })
      .pipe(map((response: MutationResult) => response.data.createAccount as SignUpResponse));
  }
}
