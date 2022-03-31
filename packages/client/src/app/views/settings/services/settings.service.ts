import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { AccountInput, AccountPasswordInput } from '@interfaces/account';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  public constructor(private apollo: Apollo) { }

  public updateAccount(accountInput: AccountInput): Observable<MutationResult> {
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
      .pipe(delay(400));
  }

  public updateAccountPassword(passAccountInput: AccountPasswordInput): Observable<MutationResult> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updatePassAccount($passAccountInput: UpdatePassAccountInput!) {
          updatePassAccount(passAccountInput: $passAccountInput) {
            id
          }
        }
      `,
      variables: {
        passAccountInput,
      },
    })
      .pipe(delay(400));
  }

  public uploadPhotoAccount(photoAccountInput: Blob): Observable<MutationResult> {
    return this.apollo.mutate({
      mutation: gql`
        mutation uploadPhotoAccount($photoAccountInput: Upload!) {
          uploadPhotoAccount(photoAccountInput: $photoAccountInput) {
            id
          }
        }
      `,
      variables: {
        photoAccountInput,
      },
      context: {
        useMultipart: true,
      },
    })
      .pipe(delay(400));
  }

  public deletePhotoAccount(): Observable<MutationResult> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deletePhotoAccount {
          deletePhotoAccount {
            id
          }
        }
      `,
    })
      .pipe(delay(400));
  }
}
