describe('Login scenerios', () => {
  it('User can login with correct email and password', () => {
    cy.intercept('POST', '**/events/bulk/*').as('waitForEmailorPasswordPopUpToAppear');
    cy.intercept('POST', " https://www.google-analytics.com/g/**").as('waitForHomePageToLoad');

    cy.visit('https://www.roon.com/')
    cy.get('[aria-label="Press to open modal"]').click();
    cy.contains('Log In').click();
    cy.contains("Continue with Email").click();

    cy.wait('@waitForEmailorPasswordPopUpToAppear');
    cy.get('input[type="email"]').type('Paste email');
    cy.contains("Continue").click();

    cy.wait('@waitForEmailorPasswordPopUpToAppear');
   cy.get('input[type="password"]').type('Paste password'); 
    cy.contains("Continue").click();

    cy.wait('@waitForHomePageToLoad');

    cy.contains('Profile').click({force: true});
    cy.get('.ml-auto').click();
    cy.contains('Logout').click();

  })
})
