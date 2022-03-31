import { graphqlApi } from '../utils/graphql-test-utils';

describe('Settings Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  context('success', () => {
    beforeEach(() => {
      cy.clearLocalStorageAndLogin();
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
        req,
        operationName: 'account',
        reply: { fixture: 'account/success' },
      }));

      cy.visit('/settings');
      cy.wait(2000);
      cy.wait('@account');
    });

    it('Should upload account picture', () => {
      cy.get('button[data-cy="delete-your-picture"]').should('not.exist');
      cy.get('button[data-cy="upload-your-picture"]').click();
      cy.get('label[data-cy="upload-add-file-button"]').should('be.visible');
      cy.get('input[data-cy="upload-file"]').attachFile('settings/images/my-picture.jpg');

      cy.get('button[data-cy="save-account-picture"]').click();
    });

    it('Should change account name', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req) => graphqlApi({
        req,
        operationName: 'updateAccount',
        reply: { fixture: 'settings/update-name' },
      }));

      cy.get('[data-cy="name-expansion-panel"]').should('be.visible');
      cy.get('[data-cy="name-expansion-panel"]').click();
      cy.get('[data-cy="expansion-panel-close-icon"]').should('exist');
      cy.get('input[data-cy="edit-your-name"]').should('have.value', 'William Augusto');
      cy.get('input[data-cy="edit-your-name"]').clear().type('Will Augusto');
      cy.get('button[data-cy="save-edit-name-panel"]').should('not.be.disabled');
      cy.get('button[data-cy="save-edit-name-panel"]').click();

      cy.wait('@updateAccount');
      cy.get('[data-cy="expansion-panel-close-icon"]').should('not.exist');
    });

    it('Should change account e-mail', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req) => graphqlApi({
        req,
        operationName: 'updateAccount',
        reply: { fixture: 'settings/update-email' },
      }));

      cy.get('[data-cy="email-expansion-panel"]').should('be.visible');
      cy.get('[data-cy="email-expansion-panel"]').click();
      cy.get('[data-cy="expansion-panel-close-icon"]').should('exist');
      cy.get('input[data-cy="edit-your-email"]').should('have.value', 'william@example.com');
      cy.get('input[data-cy="edit-your-email"]').clear().type('will@example.com');
      cy.get('button[data-cy="save-edit-email-panel"]').should('not.be.disabled');
      cy.get('button[data-cy="save-edit-email-panel"]').click();

      cy.wait('@updateAccount');
      cy.get('[data-cy="expansion-panel-close-icon"]').should('not.exist');
    });

    it('Should change account language', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req) => graphqlApi({
        req,
        operationName: 'updateAccount',
        reply: { fixture: 'settings/update-language' },
      }));

      cy.get('[data-cy="language-expansion-panel"]').should('be.visible');
      cy.get('[data-cy="language-expansion-panel"]').click();
      cy.get('[data-cy="expansion-panel-close-icon"]').should('exist');
      cy.get('mat-select[data-cy="edit-your-language"]').should('contain', 'English');
      cy.get('mat-select[data-cy="edit-your-language"]').click();
      cy.get('mat-option[data-cy="edit-your-language-option"]').contains('Portuguese').click();
      cy.get('button[data-cy="save-edit-language-panel"]').click();

      cy.wait('@updateAccount');
      cy.get('[data-cy="expansion-panel-close-icon"]').should('not.exist');
    });

    it('Should change account password', () => {
      cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
        req,
        operationName: 'updatePassAccount',
        reply: { fixture: 'account/success' },
      }));

      cy.get('[data-cy="password-expansion-panel"]').click();

      cy.get('input[data-cy="edit-your-new-password"]').type('12345678');
      cy.get('input[data-cy="edit-your-confirm-new-password"]').type('12345678');
      cy.get('button[data-cy="next-edit-password-panel"]').click();

      cy.get('input[data-cy="current-password"]').type('20222023');
      cy.get('button[data-cy="save-edit-password-panel"]').click();

      cy.wait('@updatePassAccount');
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
        cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
          req,
          operationName: 'account',
          reply: { fixture: 'account/success' },
        }));

        cy.visit('/settings');
        cy.wait(2000);
        cy.wait('@account');
      });

      context('picture', () => {
        it('Should upload an invalid file', () => {
          cy.get('button[data-cy="upload-your-picture"]').click();
          cy.get('input[data-cy="upload-file"]').attachFile('settings/update-email');
          cy.get('mat-error[data-cy="upload-picture-invalid-format-error"]').should('be.visible');
        });
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
          cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
            req,
            operationName: 'updateAccount',
            reply: { fixture: 'settings/errors/invalid-email' },
          }));

          cy.get('[data-cy="email-expansion-panel"]').should('be.visible');
          cy.get('[data-cy="email-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-email"]').clear().type('william@example');

          cy.get('button[data-cy="save-edit-email-panel"]').click();
          cy.wait('@updateAccount');

          cy.get('mat-error[data-cy="error-email-invalid"]').should('be.visible');
          cy.get('button[data-cy="save-edit-email-panel"]').should('be.disabled');
        });

        it('Should type email and receive unique email err from api', () => {
          cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
            req,
            operationName: 'updateAccount',
            reply: { fixture: 'settings/errors/email-unique' },
          }));

          cy.get('[data-cy="email-expansion-panel"]').should('be.visible');
          cy.get('[data-cy="email-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-email"]').click().blur();

          cy.get('button[data-cy="save-edit-email-panel"]').click();
          cy.wait('@updateAccount');

          cy.get('mat-error[data-cy="error-email-unique"]').should('be.visible');
          cy.get('button[data-cy="save-edit-email-panel"]').should('be.disabled');
        });
      });

      context('password', () => {
        it('Should type new password without value', () => {
          cy.get('[data-cy="password-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-new-password"]').clear().blur();
          cy.get('input[data-cy="edit-your-confirm-new-password"]').clear().blur();
          cy.get('mat-error[data-cy="error-new-password-required"]').should('be.visible');
          cy.get('mat-error[data-cy="error-confirm-new-password-required"]').should('be.visible');
          cy.get('button[data-cy="next-edit-password-panel"]').should('be.disabled');
        });

        it('Should type new password with length less than 8 characters', () => {
          cy.get('[data-cy="password-expansion-panel"]').click();
          cy.get('input[data-cy="edit-your-new-password"]').type('123').blur();
          cy.get('mat-error[data-cy="error-new-password-minlength"]').should('be.visible');
          cy.get('button[data-cy="next-edit-password-panel"]').should('be.disabled');
        });

        it('Should type confirm new password different from new password', () => {
          cy.get('[data-cy="password-expansion-panel"]').click();

          cy.get('input[data-cy="edit-your-new-password"]').type('12345678');
          cy.get('input[data-cy="edit-your-confirm-new-password"]').type('123').blur();
          cy.get('mat-error[data-cy="error-confirm-new-password-different"]').should('be.visible');
          cy.get('button[data-cy="next-edit-password-panel"]').should('be.disabled');
        });

        it('Should type invalid current password after typed new password', () => {
          cy.intercept('POST', Cypress.env('apiUrl'), (req: any) => graphqlApi({
            req,
            operationName: 'updatePassAccount',
            reply: { fixture: 'settings/errors/invalid-password' },
          }));

          cy.get('[data-cy="password-expansion-panel"]').click();

          cy.get('input[data-cy="edit-your-new-password"]').type('12345678');
          cy.get('input[data-cy="edit-your-confirm-new-password"]').type('12345678');
          cy.get('button[data-cy="next-edit-password-panel"]').click();

          cy.get('input[data-cy="current-password"]').type('20222023');
          cy.get('button[data-cy="save-edit-password-panel"]').click();

          cy.wait('@updatePassAccount');
          cy.get('mat-error[data-cy="error-current-password-incorrect"]').should('be.visible');
        });
      });
    });
  });
});
