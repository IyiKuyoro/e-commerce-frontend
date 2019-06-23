describe('Search products', () => {
  it('Should search for products', () => {
    cy.visit('http://localhost:4200');

    cy.get('.search-input').last().type('italy{enter}');
    cy.contains('Add to Cart')
  })
})
