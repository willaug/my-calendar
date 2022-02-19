describe('HeaderComponent', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  context('Smartphones and tablets (width <= 959px)', () => {
    beforeEach(() => cy.viewport('iphone-xr'));

    it('Should hide menu button if unauthenticated account', () => {
      cy.get('app-header').find('button[data-cy="navbar-menu-button"]').should('not.exist');
    });

    it('Should show menu button if authenticated account', () => {
      cy.clearLocalStorageAndLogin();
      cy.get('app-header').find('button[data-cy="navbar-menu-button"]').should('be.visible');
    });
  });

  context('Other devices (width > 959px)', () => {
    beforeEach(() => cy.viewport('macbook-13'));

    it('Should show logo if unauthenticated account', () => {
      cy.get('app-header').find('img[data-cy="header-logo"]').should('be.visible');
    });

    it('Should hide menu button if authenticated account', () => {
      cy.clearLocalStorageAndLogin();
      cy.get('app-header').find('button[data-cy="navbar-menu-button"]').should('not.be.visible');
    });

    it('Should hide logo if authenticated account', () => {
      cy.clearLocalStorageAndLogin();
      cy.get('app-header').find('img[data-cy="header-logo"]').should('not.be.visible');
    });
  });
});
