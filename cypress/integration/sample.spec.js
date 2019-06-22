describe('Visit home page', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('http://localhost:4200');

    cy.contains('SHOPMATE');
    cy.contains('Mens Wear');
    cy.contains('Departments');
  })
})
