import { aliasMutation, aliasQuery } from 'cypress/utils/graphql-test-utils';

Cypress.Commands.add('clearLocalStorageAndLogin', (): void => {
  cy.clearLocalStorage();
  cy.visit('/');

  cy.get('mat-toolbar').find('button[data-cy="open-get-started-menu"]').click();
  cy.get('.mat-menu-content').find('button[data-cy="open-sign-in"]').click();
  cy.get('app-dialog-login').find('input[data-cy="email"]').type('william@example.com');
  cy.get('app-dialog-login').find('input[data-cy="password"]').type('1234');

  cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
    req,
    operation: 'login',
    fixture: 'login/success',
  }));

  cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasQuery({
    req,
    operation: 'account',
    fixture: 'account/success',
  }));

  cy.get('app-dialog-login').find('button[data-cy="submit-login"]').click();
  cy.wait(['@gqlLoginMutation', '@gqlAccountQuery']);
});
