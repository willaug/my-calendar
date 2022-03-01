import { aliasQuery } from 'cypress/utils/graphql-test-utils';

describe('Your Account Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  context('success', () => {
    beforeEach(() => {
      cy.clearLocalStorageAndLogin();
    });

    it('Should click in person icon inside navbar. Then redirect to your account page', () => {
      cy.get('a[data-cy="navbar-option-2"]').click();
      cy.url().should('include', '/account');
    });

    it('Should visit your account page by url successfully', () => {
      cy.visit('/account');
      cy.url().should('include', '/account');
    });

    it('Should load and show all account data successfully', () => {
      cy.get('a[data-cy="navbar-option-2"]').click();
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasQuery({
        req,
        operation: 'account',
        fixture: 'account/success',
      }));

      cy.wait('@gqlAccountQuery');
      cy.get('img[data-cy="account-image"]').should('be.visible');
      cy.get('h2[data-cy="account-name"]').should('contain', 'William Augusto');

      cy.get('mat-icon[data-cy="account-data-0-icon"]').should('contain', 'face');
      cy.get('mat-icon[data-cy="account-data-1-icon"]').should('contain', 'alternate_email');
      cy.get('mat-icon[data-cy="account-data-2-icon"]').should('contain', 'language');
      cy.get('mat-icon[data-cy="account-data-3-icon"]').should('contain', 'add');
      cy.get('mat-icon[data-cy="account-data-4-icon"]').should('contain', 'edit');

      cy.get('mat-card-subtitle[data-cy="account-data-title"]').should('have.length', 5);
      cy.get('mat-card-title[data-cy="account-data-0-value"]').should('contain', 'William Augusto');
      cy.get('mat-card-title[data-cy="account-data-1-value"]').should('contain', 'william@example.com');
      cy.get('mat-card-title[data-cy="account-data-2-value"]').should('contain', 'English');
      cy.get('mat-card-title[data-cy="account-data-3-value"]').should('contain', '01/25/22, 10:57 AM');
      cy.get('mat-card-title[data-cy="account-data-4-value"]').should('contain', '02/13/22, 09:02 PM');
    });

    it('Should show loading progress and spinner before load account data', () => {
      cy.get('a[data-cy="navbar-option-2"]').click();
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasQuery({
        req,
        delay: 2000,
        operation: 'account',
        fixture: 'account/success',
      }));

      cy.get('[data-cy="main-progress-bar"]').should('be.visible');
      cy.get('div[data-cy="fake-image-background"]').should('be.visible');
      cy.get('h2[data-cy="account-name"]').should('contain', 'Loading...');
      cy.get('mat-spinner[data-cy="account-image-spinner"]').should('be.visible');
      cy.get('mat-card-title[data-cy="account-data-loading"]').should('have.length', 5);
    });

    it('Should hide loading progress and spinner after load account data', () => {
      cy.get('a[data-cy="navbar-option-2"]').click();
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasQuery({
        req,
        operation: 'account',
        fixture: 'account/success',
      }));

      cy.wait('@gqlAccountQuery');
      cy.get('[data-cy="main-progress-bar"]').should('not.exist');
      cy.get('div[data-cy="fake-image-background"]').should('not.exist');
      cy.get('h2[data-cy="account-name"]').should('not.contain', 'Loading...');
      cy.get('mat-spinner[data-cy="account-image-spinner"]').should('not.exist');
      cy.get('mat-card-title[data-cy="account-data-loading"]').should('not.exist');
    });
  });

  context('err', () => {
    it('Should redirect unauthenticated account to index page', () => {
      cy.visit('/account');
      cy.url().should('include', '/');
      cy.url().should('not.include', '/account');
    });
  });
});
