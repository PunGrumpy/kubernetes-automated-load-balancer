describe('Error Handling', () => {
  it('should display error message when API fails', () => {
    cy.intercept('GET', '/api/visitor', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getAnalyticsError')

    cy.visit('/')
    cy.wait('@getAnalyticsError')

    cy.get('[role="alert"]').should('be.visible')
    cy.get('[role="alert"]').should('contain', 'Error')
  })
})
