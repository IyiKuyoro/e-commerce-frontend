describe('Login and Register', () => {
  describe('Register', () => {
    it('should validate wrong data', () => {
      cy.visit('http://localhost:4200');

      cy.get("#register").click();

      cy.contains('Register');
    });

    it('should enter wrong email format', () => {
      cy.get('#name').type('12345');
      cy.get('#email').type('johnDoe');
      cy.get('#password').focus();
      cy.get('#name').focus();

      cy.contains('Please provide a valid name');
      cy.contains('Please provide a valid email');
      cy.contains('Please provide a valid password');
    });

    it('should ensure password matches', () => {
      cy.get('#password').type('password');
      cy.get('#confirm-password').type('passwordd');
      cy.get('#name').focus();

      cy.contains('Password must match');
    });
  });

  describe('Login', () => {
    it('should get validations errors', () => {
      cy.visit('http://localhost:4200');

      cy.contains('Sign in').click();
      cy.contains('Login');
    })

    it('should enter wrong email format', () => {
      cy.get('#email').type('johnDoe');
      cy.get('#password').focus();
      cy.get('#email').focus();

      cy.contains('Please provide a valid email');
      cy.contains('Please provide a password');
    });

    it('should not sign-in wrong email and password', () => {
      cy.get('#email').clear();

      cy.get('#email').type('john.doe@test.com');
      cy.get('#password').type('testpassword');

      cy.contains('SUBMIT').click();

      cy.contains('This email is not associated with a user');
    });
  })
})
