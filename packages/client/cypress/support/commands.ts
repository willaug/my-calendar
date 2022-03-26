import { graphqlApi } from 'cypress/utils/graphql-test-utils';

Cypress.Commands.add('clearLocalStorageAndLogin', (): void => {
  cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
    req,
    operationName: 'login',
    reply: { fixture: 'login/success' },
  }));

  cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
    req,
    operationName: 'account',
    reply: { fixture: 'account/success' },
  }));

  cy.clearLocalStorage();
  cy.visit('/');

  cy.get('mat-toolbar').find('button[data-cy="open-get-started-menu"]').click();
  cy.get('.mat-menu-content').find('button[data-cy="open-sign-in"]').click();
  cy.get('app-dialog-login').find('input[data-cy="email"]').type('william@example.com');
  cy.get('app-dialog-login').find('input[data-cy="password"]').type('1234');

  cy.get('app-dialog-login').find('button[data-cy="submit-login"]').click();
  cy.wait(['@login', '@account']);
});
