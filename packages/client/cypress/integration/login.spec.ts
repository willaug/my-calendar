import { Interception } from 'cypress/types/net-stubbing';
import { graphqlApi } from '../utils/graphql-test-utils';

describe('Login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');

    cy.get('mat-toolbar').find('button[data-cy="open-get-started-menu"]').click();
    cy.get('.mat-menu-content').find('button[data-cy="open-sign-in"]').click();
  });

  context('success', () => {
    it('Should show and hide password field', () => {
      cy.get('app-dialog-login').find('input[data-cy="password"]').should('have.attr', 'type', 'password');
      cy.get('app-dialog-login').find('button[data-cy="hide-password"]').click();
      cy.get('app-dialog-login').find('input[data-cy="password"]').should('have.attr', 'type', 'text');
      cy.get('app-dialog-login').find('button[data-cy="hide-password"]').click();
      cy.get('app-dialog-login').find('input[data-cy="password"]').should('have.attr', 'type', 'password');
    });

    it('Should login and receive authentication token', () => {
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

      cy.get('app-dialog-login').find('input[data-cy="email"]').type('william@example.com');
      cy.get('app-dialog-login').find('input[data-cy="password"]').type('1234{enter}');
      cy.wait('@login').then((interception: Interception) => {
        const { token } = interception.response && interception.response.body.data.login;
        expect(token).to.eq(localStorage.getItem(Cypress.env('localStorageAuthItemName')));
      });

      cy.get('app-dialog-login').should('not.exist');
      cy.wait('@account');

      cy.get('button[data-cy="open-get-started-menu"]').should('not.exist');
      cy.get('button[data-cy="open-my-account-menu"]').should('exist');
      cy.get('button[data-cy="open-my-account-menu"]').should('have.css', 'background-image');
      cy.get('button[data-cy="open-my-account-menu"]').click();

      cy.get('[data-cy="my-account-menu-name"]').should('contain', 'William Augusto');
      cy.get('[data-cy="my-account-menu-sign-out"]').should('contain', 'Sign out');
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

    it('Should send email without domain and receive api error', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
        req,
        operationName: 'login',
        reply: { fixture: 'login/errors/invalid-email' },
      }));

      cy.get('app-dialog-login').find('input[data-cy="email"]').type('example@withoutDomain');
      cy.get('app-dialog-login').find('input[data-cy="password"]').type('example');
      cy.get('app-dialog-login').find('button[data-cy="submit-login"]').click();

      cy.wait('@login');
      cy.get('app-dialog-login').find('mat-error[data-cy="error-email-invalid"]').should('exist');
    });

    it('Should send incorrect email and password', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
        req,
        operationName: 'login',
        reply: { fixture: 'login/errors/incorrect-email-or-password' },
      }));

      cy.get('app-dialog-login').find('input[data-cy="email"]').type('example@domain.co');
      cy.get('app-dialog-login').find('input[data-cy="password"]').type('example');
      cy.get('app-dialog-login').find('button[data-cy="submit-login"]').click();

      cy.wait('@login');
      cy.get('app-dialog-login').find('mat-error[data-cy="error-login"]').should('exist');
    });
  });
});
