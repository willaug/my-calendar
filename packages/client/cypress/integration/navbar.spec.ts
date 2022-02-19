describe('NavBarComponent', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  context('Unauthenticated account', () => {
    it('Should hide navbar if unauthenticated account', () => {
      cy.get('mat-sidenav[data-cy="sidenav"]').should('not.exist');
    });

    it('Should hide navbar after logout on laptop', () => {
      cy.clearLocalStorageAndLogin();

      cy.viewport('macbook-13');
      cy.get('mat-sidenav[data-cy="sidenav"]').should('be.visible');
      cy.get('button[data-cy="open-my-account-menu"]').click();
      cy.get('[data-cy="my-account-menu-sign-out"]').click();
      cy.get('mat-sidenav[data-cy="sidenav"]').should('not.exist');
    });
  });

  context('Authenticated account', () => {
    beforeEach(() => {
      cy.clearLocalStorageAndLogin();
    });

    it('Should show navbar with over mode on smartphones and tablets', () => {
      cy.viewport('iphone-xr');

      cy.get('app-header').find('button[data-cy="navbar-menu-button"]').click();
      cy.get('mat-sidenav[data-cy="sidenav"]').should('be.visible');
      cy.get('mat-sidenav[data-cy="sidenav"]').invoke('attr', 'ng-reflect-mode').should('contain', 'over');
      cy.get('.mat-drawer-backdrop').should('be.visible');
    });

    it('Should show navbar with side mode on other devices', () => {
      cy.viewport('macbook-13');

      cy.get('mat-sidenav[data-cy="sidenav"]').should('be.visible');
      cy.get('mat-sidenav[data-cy="sidenav"]').invoke('attr', 'ng-reflect-mode').should('contain', 'side');
      cy.get('.mat-drawer-backdrop').should('not.be.visible');
    });

    it('Should change mode of navbar from smartphone to laptop', () => {
      cy.viewport('iphone-xr');
      cy.get('mat-sidenav[data-cy="sidenav"]').should('not.be.visible');

      cy.viewport('macbook-13');
      cy.get('mat-sidenav[data-cy="sidenav"]').should('be.visible');
      cy.get('mat-sidenav[data-cy="sidenav"]').invoke('attr', 'ng-reflect-mode').should('contain', 'side');
    });

    it('Should change mode of navbar from laptop to smartphone', () => {
      cy.viewport('macbook-13');
      cy.get('mat-sidenav[data-cy="sidenav"]').should('be.visible');
      cy.get('mat-sidenav[data-cy="sidenav"]').invoke('attr', 'ng-reflect-mode').should('contain', 'side');

      cy.viewport('iphone-xr');
      cy.get('mat-sidenav[data-cy="sidenav"]').should('be.visible');
      cy.get('mat-sidenav[data-cy="sidenav"]').invoke('attr', 'ng-reflect-mode').should('contain', 'over');
    });
  });
});
