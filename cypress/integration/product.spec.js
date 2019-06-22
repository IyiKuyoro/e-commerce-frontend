describe('Product page', () => {
  it('Should load product page', () => {
    cy.visit('http://localhost:4200');
    cy.get('.product-card').first().trigger('click');

    cy.contains('Add to Cart');
  })
})
