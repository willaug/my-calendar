describe('Home', () => {
  before(() => cy.visit('/'));

  it('Should browser url equal "/"', () => {
    cy.url().should('include', '/');
  });

  it('Should logo load', () => {
    cy.get('.home-logo').should('be.visible');
    cy.get('.home-logo').invoke('attr', 'src').should('contain', 'assets/icon.svg');
  });

  it('Should have title', () => {
    cy.get('.home-card__title').should('be.visible');
    cy.get('.home-card__title').contains('MyCalendar');
  });

  it('Should have description', () => {
    cy.get('mat-card-content').should('be.visible');
    cy.get('mat-card-content').contains('Olá');
  });

  it('Should have footer', () => {
    cy.get('footer').should('be.visible');
    cy.get('footer').invoke('attr', 'class').should('contain', 'home-footer');
    cy.get('footer').contains(`©${new Date().getFullYear()} MyCalendar`);
  });
});
