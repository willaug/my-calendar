import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '@interfaces/index';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginApiService {
  public constructor(private apollo: Apollo) { }

  public login(loginInput: Login): Observable<LoginResponse> {
    return this.apollo.mutate({
      mutation: gql`
        mutation login($loginInput: LoginInput!) {
          login(loginInput: $loginInput) {
            token
          }
        }
      `,
      variables: {
        loginInput,
      },
    })
      .pipe(map((response: MutationResult) => response.data.login as LoginResponse));
  }
}
