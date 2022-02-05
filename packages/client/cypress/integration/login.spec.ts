import { Interception } from 'cypress/types/net-stubbing';
import { aliasMutation } from '../utils/graphql-test-utils';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();

    cy.get('mat-toolbar').find('mat-icon').contains('account_circle').click();
    cy.get('.mat-menu-content').find('button[data-cy="open-sign-in"]').click();
  });

  context('success', () => {
    it('Should login and receive authentication token', () => {
      cy.get('app-dialog-login').find('input[data-cy="email"]').type('example@domain.co');
      cy.get('app-dialog-login').find('input[data-cy="password"]').type('example');

      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
        req,
        operation: 'login',
        fixture: 'login/success',
      }));

      cy.get('app-dialog-login').find('button[data-cy="submit-login"]').click();
      cy.wait('@gqlLoginMutation').then((interception: Interception) => {
        expect(interception.response?.body.data.login.token).to.eq(localStorage.getItem('MC_AUTH_TOKEN'));
        cy.get('app-dialog-login').should('not.exist');
      });
    });
  });

  context('err', () => {
    it('Should type invalid information', () => {
      cy.get('app-dialog-login').find('input[data-cy="email"]').focus().blur();
      cy.get('app-dialog-login').find('input[data-cy="password"]').focus().blur();
      cy.get('app-dialog-login').find('mat-error[data-cy*="required"]').should('have.length', 2);
    });

    it('Should type invalid email', () => {
      cy.get('app-dialog-login').find('input[data-cy="email"]').type('example').blur();
      cy.get('app-dialog-login').find('mat-error[data-cy="error-email-invalid"]').should('exist');
    });

    it('Should show and hide password field', () => {
      cy.get('app-dialog-login').find('input[data-cy="password"]').should('have.attr', 'type', 'password');
      cy.get('app-dialog-login').find('button[data-cy="hide-password"]').click();
      cy.get('app-dialog-login').find('input[data-cy="password"]').should('have.attr', 'type', 'text');
      cy.get('app-dialog-login').find('button[data-cy="hide-password"]').click();
      cy.get('app-dialog-login').find('input[data-cy="password"]').should('have.attr', 'type', 'password');
    });

    it('Should send email without domain and receive api error', () => {
      cy.get('app-dialog-login').find('input[data-cy="email"]').type('example@withoutDomain');
      cy.get('app-dialog-login').find('input[data-cy="password"]').type('example');

      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
        req,
        operation: 'login',
        fixture: 'login/errors/invalid-email',
      }));

      cy.get('app-dialog-login').find('button[data-cy="submit-login"]').click();
      cy.wait('@gqlLoginMutation').then(() => {
        cy.get('app-dialog-login').find('mat-error[data-cy="error-email-invalid"]').should('exist');
      });
    });

    it('Should send incorrect email and password', () => {
      cy.get('app-dialog-login').find('input[data-cy="email"]').type('example@domain.co');
      cy.get('app-dialog-login').find('input[data-cy="password"]').type('example');

      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
        req,
        operation: 'login',
        fixture: 'login/errors/incorrect-email-or-password',
      }));

      cy.get('app-dialog-login').find('button[data-cy="submit-login"]').click();
      cy.wait('@gqlLoginMutation').then(() => {
        cy.get('app-dialog-login').find('mat-error[data-cy="error-login"]').should('exist');
      });
    });
  });
});
