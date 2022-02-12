import { Injectable } from '@angular/core';
import { Account } from '@interfaces/index';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  public constructor(private apollo: Apollo) { }

  public account(token: string): Observable<Account> {
    return this.apollo.mutate({
      mutation: gql`
        query account {
          account {
            id
            name
            email
            photoPath
            language
            createdAt
            updatedAt
          }
        }
      `,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
      .pipe(map((response: MutationResult) => response.data.account as Account));
  }
}
