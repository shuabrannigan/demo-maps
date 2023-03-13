describe('Root Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has feature viewer button and navigates', () => {
    let button = cy.get('[data-test="feature-viewer"]')
    button.should('exist')
    button.click();
    cy.location('pathname').should('match', /\/feature-viewer$/)
  });

  it('has linear reference button and navigates', () => {
    let button = cy.get('[data-test="linear-reference"]')
    button.should('exist')
    
    button.click()
    cy.location('pathname').should('match', /\/linear-reference$/)
  })
});
