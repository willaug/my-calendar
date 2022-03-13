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
      cy.wait(2000);
      cy.wait('@gqlAccountQuery');
    });

    it('Should change account name', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req) => aliasMutation({
        req,
        operation: 'updateAccount',
        fixture: 'settings/update-name',
      }));

      cy.get('[data-cy="name-expansion-panel"]').should('be.visible');
      cy.get('[data-cy="name-expansion-panel"]').click();
      cy.get('[data-cy="expansion-panel-close-icon"]').should('exist');
      cy.get('input[data-cy="edit-your-name"]').should('have.value', 'William Augusto');
      cy.get('input[data-cy="edit-your-name"]').clear().type('Will Augusto');
      cy.get('button[data-cy="save-edit-name-panel"]').should('not.be.disabled');
      cy.get('button[data-cy="save-edit-name-panel"]').click();

      cy.wait('@gqlUpdateAccountMutation');
      cy.get('[data-cy="expansion-panel-close-icon"]').should('not.exist');
    });

    it('Should change account e-mail', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req) => aliasMutation({
        req,
        operation: 'updateAccount',
        fixture: 'settings/update-email',
      }));

      cy.get('[data-cy="email-expansion-panel"]').should('be.visible');
      cy.get('[data-cy="email-expansion-panel"]').click();
      cy.get('[data-cy="expansion-panel-close-icon"]').should('exist');
      cy.get('input[data-cy="edit-your-email"]').should('have.value', 'william@example.com');
      cy.get('input[data-cy="edit-your-email"]').clear().type('will@example.com');
      cy.get('button[data-cy="save-edit-email-panel"]').should('not.be.disabled');
      cy.get('button[data-cy="save-edit-email-panel"]').click();

      cy.wait('@gqlUpdateAccountMutation');
      cy.get('[data-cy="expansion-panel-close-icon"]').should('not.exist');
    });
  });

  context('err', () => {
    it('Should redirect unauthenticated account to index page', () => {
      cy.visit('/settings');
      cy.url().should('include', '/');
      cy.url().should('not.include', '/settings');
    });

    context('validations', () => {
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

      context('name', () => {
        it('Should type name without value', () => {
          cy.get('[data-cy="name-expansion-panel"]').should('be.visible');
          cy.get('[data-cy="name-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-name"]').clear().blur();
          cy.get('mat-error[data-cy="error-name-required"]').should('be.visible');
          cy.get('button[data-cy="save-edit-name-panel"]').should('be.disabled');
        });

        it('Should type name with length less than 5 characters', () => {
          cy.get('[data-cy="name-expansion-panel"]').should('be.visible');
          cy.get('[data-cy="name-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-name"]').clear().type('Will').blur();
          cy.get('mat-error[data-cy="error-name-min-length"]').should('be.visible');
          cy.get('button[data-cy="save-edit-name-panel"]').should('be.disabled');
        });
      });

      context('email', () => {
        it('Should type email without value', () => {
          cy.get('[data-cy="email-expansion-panel"]').should('be.visible');
          cy.get('[data-cy="email-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-email"]').clear().blur();
          cy.get('mat-error[data-cy="error-email-required"]').should('be.visible');
          cy.get('button[data-cy="save-edit-email-panel"]').should('be.disabled');
        });

        it('Should type invalid email', () => {
          cy.get('[data-cy="email-expansion-panel"]').should('be.visible');
          cy.get('[data-cy="email-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-email"]').clear().type('william').blur();
          cy.get('mat-error[data-cy="error-email-invalid"]').should('be.visible');
          cy.get('button[data-cy="save-edit-email-panel"]').should('be.disabled');
        });

        it('Should type email without domain and receive api err', () => {
          cy.get('[data-cy="email-expansion-panel"]').should('be.visible');
          cy.get('[data-cy="email-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-email"]').clear().type('william@example');

          cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
            req,
            operation: 'updateAccount',
            fixture: 'settings/errors/invalid-email',
          }));

          cy.get('button[data-cy="save-edit-email-panel"]').click();
          cy.wait('@gqlUpdateAccountMutation');

          cy.get('mat-error[data-cy="error-email-invalid"]').should('be.visible');
          cy.get('button[data-cy="save-edit-email-panel"]').should('be.disabled');
        });

        it('Should type email and receive unique email err from api', () => {
          cy.get('[data-cy="email-expansion-panel"]').should('be.visible');
          cy.get('[data-cy="email-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-email"]').click().blur();

          cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => aliasMutation({
            req,
            operation: 'updateAccount',
            fixture: 'settings/errors/email-unique',
          }));

          cy.get('button[data-cy="save-edit-email-panel"]').click();
          cy.wait('@gqlUpdateAccountMutation');

          cy.get('mat-error[data-cy="error-email-unique"]').should('be.visible');
          cy.get('button[data-cy="save-edit-email-panel"]').should('be.disabled');
        });
      });
    });
  });
});
