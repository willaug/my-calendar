describe('Logout', () => {
  beforeEach(() => {
    cy.clearLocalStorageAndLogin();
  });

  it('Should logout and clear item in localStorage', () => {
    cy.get('button[data-cy="open-my-account-menu"]').click();
    cy.get('[data-cy="my-account-menu-sign-out"]').should('contain', 'Sign out');
    cy.get('[data-cy="my-account-menu-sign-out"]').click();

    cy.get('mat-toolbar').find('button[data-cy="open-get-started-menu"]').should('exist');
    cy.get('button[data-cy="open-my-account-menu"]').should('not.exist').then(() => {
      expect(localStorage.getItem(Cypress.env('localStorageAuthItemName'))).to.eq(null);
    });
  });
});
