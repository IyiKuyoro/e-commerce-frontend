describe('Shopping Cart', () => {
  it('Add items to cart', () => {
    cy.visit('http://localhost:4200');
    cy.get('.product-card').first().trigger('click');

    cy.get('#add-to-cart').click();
  });

  it('view cart and update address', () => {
    cy.get('.shopping-bag').last().click();

    cy.contains('Login');

    cy.get('#email').clear();
    cy.get('#password').clear();

    cy.get('#email').type('test@user.com', {force: true});
    cy.get('#password').type('password', {force: true});

    cy.contains('SUBMIT').click();

    cy.contains('test');

    cy.get('.shopping-bag').last().click();

    cy.get('.shopping-bag').last().click();

    cy.contains('Buy Now').click();
    cy.contains('Order Summary');
  });
});
