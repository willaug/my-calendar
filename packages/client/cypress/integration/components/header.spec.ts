describe('HeaderComponent', () => {
  beforeEach(() => cy.visit('/'));

  it('Should have header', () => {
    cy.get('app-header').should('exist');
    cy.get('app-header').find('mat-toolbar').should('exist');
  });

  it('Should have menu button in header', () => {
    cy.get('mat-toolbar').find('mat-icon').contains('menu').should('exist');
  });

  context('Account actions button', () => {
    it('Should login', () => {
      cy.get('mat-toolbar').find('mat-icon').contains('account_circle').click();
      cy.get('.mat-menu-content').find('button[aria-label="Sign In"]').click();
      cy.get('.mat-menu-content').should('not.exist');
    });

    it('Should sign up', () => {
      cy.get('mat-toolbar').find('mat-icon').contains('account_circle').click();
      cy.get('.mat-menu-content').find('button[aria-label="Sign Up"]').click();
      cy.get('.mat-menu-content').should('not.exist');
    });
  });
});
