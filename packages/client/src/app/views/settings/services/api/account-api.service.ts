import { delay, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Account, AccountInput } from '@interfaces/account';
import { Apollo, gql, MutationResult } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  public constructor(private apollo: Apollo) { }

  public updateAccount(accountInput: AccountInput): Observable<Account> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateAccount($accountInput: UpdateAccountInput!) {
          updateAccount(accountInput: $accountInput) {
            id
          }
        }
      `,
      variables: {
        accountInput,
      },
    })
      .pipe(
        delay(400),
        map((response: MutationResult) => response.data.updateAccount as Account),
      );
  }
}
