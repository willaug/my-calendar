describe('Settings Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  context('success', () => {
    beforeEach(() => {
      cy.clearLocalStorageAndLogin();
      cy.visit('/settings');
    });

    it('Should open and close a expansion panel and change icon', () => {
      cy.get('[data-cy="expansion-panel-create-icon"]').should('exist');
      cy.get('[data-cy="picture-expansion-panel"]').click();
      cy.get('[data-cy="expansion-panel-close-icon"]').should('exist');
      cy.get('[data-cy="picture-expansion-panel"]').click();
      cy.get('[data-cy="expansion-panel-create-icon"]').should('exist');
    });

    it('Should load expansion panel about account picture', () => {
      cy.get('[data-cy="picture-expansion-panel"]').should('contain', 'Your picture');
      cy.get('[data-cy="picture-expansion-panel"]').should('contain', 'Change your actual picture.');
    });

    it('Should load expansion panel about account name', () => {
      cy.get('[data-cy="name-expansion-panel"]').should('contain', 'Your name');
      cy.get('[data-cy="name-expansion-panel"]').should('contain', 'Change your full-name.');
    });

    it('Should load expansion panel about account email', () => {
      cy.get('[data-cy="email-expansion-panel"]').should('contain', 'Your email');
      cy.get('[data-cy="email-expansion-panel"]').should('contain', 'Change your primary email.');
    });

    it('Should load expansion panel about account language', () => {
      cy.get('[data-cy="language-expansion-panel"]').should('contain', 'Your language');
      cy.get('[data-cy="language-expansion-panel"]').should('contain', 'Change your preference language.');
    });

    it('Should load expansion panel about account password', () => {
      cy.get('[data-cy="password-expansion-panel"]').should('contain', 'Your password');
      cy.get('[data-cy="password-expansion-panel"]').should('contain', 'Create a new password to use in login.');
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
