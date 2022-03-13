import { aliasMutation } from 'cypress/utils/graphql-test-utils';

describe('SignUp', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');

    cy.get('mat-toolbar').find('button[data-cy="open-get-started-menu"]').click();
    cy.get('.mat-menu-content').find('button[data-cy="open-sign-up"]').click();
  });

  context('success', () => {
    it('Should create account and redirect to login dialog', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
        req,
        operation: 'createAccount',
        fixture: 'sign-up/success',
      }));

      cy.get('app-dialog-sign-up').find('input[data-cy="name"]').type('  William  Augusto');
      cy.get('app-dialog-sign-up').find('input[data-cy="email"]').type('will.augusto@example.com');
      cy.get('app-dialog-sign-up').find('input[data-cy="password"]').type('example1234{enter}');
      cy.get('app-dialog-sign-up').find('mat-hint[data-cy="hint-length-name"]').should('contain', '15/100');
      cy.get('app-dialog-sign-up').find('mat-hint[data-cy="hint-length-password"]').should('contain', '11/100');
      cy.wait('@gqlCreateAccountMutation');

      cy.get('app-dialog-sign-up').should('not.exist');
      cy.get('app-dialog-login').should('exist');
      cy.get('app-dialog-login').find('input[data-cy="email"]').should('have.value', 'will.augusto@example.com');
    });

    it('Should show and hide password field', () => {
      cy.get('app-dialog-sign-up').find('input[data-cy="password"]').should('have.attr', 'type', 'password');
      cy.get('app-dialog-sign-up').find('button[data-cy="hide-password"]').click();
      cy.get('app-dialog-sign-up').find('input[data-cy="password"]').should('have.attr', 'type', 'text');
      cy.get('app-dialog-sign-up').find('button[data-cy="hide-password"]').click();
      cy.get('app-dialog-sign-up').find('input[data-cy="password"]').should('have.attr', 'type', 'password');
    });
  });

  context('err', () => {
    it('Should type invalid information', () => {
      cy.get('app-dialog-sign-up').find('input[data-cy="name"]').focus().blur();
      cy.get('app-dialog-sign-up').find('input[data-cy="email"]').focus().blur();
      cy.get('app-dialog-sign-up').find('input[data-cy="password"]').focus().blur();
      cy.get('app-dialog-sign-up').find('mat-error[data-cy*="required"]').should('have.length', 3);

      cy.get('app-dialog-sign-up').find('button[data-cy="submit-sign-up"]').should('be.disabled');
    });

    it('Should type name with length less than 5 characters', () => {
      cy.get('app-dialog-sign-up').find('input[data-cy="name"]').type('Will').blur();
      cy.get('app-dialog-sign-up').find('mat-error[data-cy="error-name-min-length"]').should('exist');
    });

    it('Should type invalid email', () => {
      cy.get('app-dialog-sign-up').find('input[data-cy="name"]').type('example');
      cy.get('app-dialog-sign-up').find('input[data-cy="email"]').type('example').blur();
      cy.get('app-dialog-sign-up').find('mat-error[data-cy="error-email-invalid"]').should('exist');
    });

    it('Should type password with length less than 8 characters', () => {
      cy.get('app-dialog-sign-up').find('input[data-cy="name"]').type('example');
      cy.get('app-dialog-sign-up').find('input[data-cy="password"]').type('123').blur();
      cy.get('app-dialog-sign-up').find('mat-error[data-cy="error-password-min-length"]').should('exist');
    });

    it('Should type email without domain and receive api error', () => {
      cy.get('app-dialog-sign-up').find('input[data-cy="name"]').type('example');
      cy.get('app-dialog-sign-up').find('input[data-cy="email"]').type('example@withoutDomain');
      cy.get('app-dialog-sign-up').find('input[data-cy="password"]').type('example1234');

      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
        req,
        operation: 'createAccount',
        fixture: 'sign-up/errors/invalid-email',
      }));

      cy.get('app-dialog-sign-up').find('button[data-cy="submit-sign-up"]').click();
      cy.wait('@gqlCreateAccountMutation');
      cy.get('app-dialog-sign-up').find('mat-error[data-cy="error-email-invalid"]').should('exist');
    });

    it('Should type email and receive unique email error from api', () => {
      cy.get('app-dialog-sign-up').find('input[data-cy="name"]').type('example');
      cy.get('app-dialog-sign-up').find('input[data-cy="email"]').type('william@example.com');
      cy.get('app-dialog-sign-up').find('input[data-cy="password"]').type('example1234');

      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
        req,
        operation: 'createAccount',
        fixture: 'sign-up/errors/email-unique',
      }));

      cy.get('app-dialog-sign-up').find('button[data-cy="submit-sign-up"]').click();
      cy.wait('@gqlCreateAccountMutation');
      cy.get('app-dialog-sign-up').find('mat-error[data-cy="error-email-unique"]').should('exist');
    });
  });
});
