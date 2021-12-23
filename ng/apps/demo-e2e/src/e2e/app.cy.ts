
describe('demo', () => {
  beforeEach(() => cy.visit('')); // will use baseUrl param

  it('go to list page', () => {
    console.log('url', cy.url());
    cy.url().should('include', '/convoluted')
  });

  it('should have table', () => {
    cy.get('#table')
      .should('be.visible')
  });

  // it('should display welcome message', () => {
  //   // Custom command example, see `../support/commands.ts` file
  //   cy.login('my-email@something.com', 'myPassword');
  //
  //   // Function helper example, see `../support/app.po.ts` file
  //   getGreeting().contains('Welcome demo');
  // });
});
