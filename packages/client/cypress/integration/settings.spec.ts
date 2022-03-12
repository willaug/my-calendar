import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils';

describe('Settings Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  context('success', () => {
    beforeEach(() => {
      cy.clearLocalStorageAndLogin();
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasQuery({
        req,
        operation: 'account',
        fixture: 'account/success',
      }));

      cy.visit('/settings');
      cy.wait('@gqlAccountQuery');
    });

    it('Should change account name', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req) => aliasQuery({
        req,
        operation: 'account',
      }));

      cy.intercept('POST', Cypress.env('apiUrl'), (req) => aliasMutation({
        req,
        operation: 'updateAccount',
      }));

      cy.get('[data-cy="name-expansion-panel"]').should('be.visible');
      cy.get('[data-cy="name-expansion-panel"]').click();
      cy.get('[data-cy="expansion-panel-close-icon"]').should('exist');
      cy.get('input[data-cy="edit-your-name"]').should('have.value', 'William Augusto');
      cy.get('input[data-cy="edit-your-name"]').clear().type('willaug');
      cy.get('button[data-cy="save-edit-name-panel"]').should('not.be.disabled');
      cy.get('button[data-cy="save-edit-name-panel"]').click();

      cy.wait(['@gqlAccountQuery', '@gqlUpdateAccountMutation']);
      cy.get('[data-cy="expansion-panel-close-icon"]').should('not.exist');
    });
  });

  context('err', () => {
    it('Should redirect unauthenticated account to index page', () => {
      cy.visit('/settings');
      cy.url().should('include', '/');
      cy.url().should('not.include', '/settings');
    });
  });
});
