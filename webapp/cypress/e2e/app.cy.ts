describe('Analytics Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('GET', '/api/visitor', { fixture: 'analytics-data.json' }).as(
      'getAnalytics'
    )
  })

  it('should display the overview tab by default', () => {
    cy.wait('@getAnalytics')
    cy.contains('API Request Analytics Dashboard', { timeout: 10000 }).should(
      'be.visible'
    )
    cy.get('button')
      .contains('Overview')
      .should('have.attr', 'aria-selected', 'true')
    cy.contains('Requests Overview').should('be.visible')
  })

  it('should switch to insights tab when clicked', () => {
    cy.wait('@getAnalytics')
    cy.get('button').contains('Insights').click()
    cy.get('button')
      .contains('Insights')
      .should('have.attr', 'aria-selected', 'true')
    cy.contains('Browser Distribution').should('be.visible')
  })

  it('should display correct stats in the overview', () => {
    cy.wait('@getAnalytics')
    cy.contains('API Request Analytics Dashboard', { timeout: 10000 }).should(
      'be.visible'
    )

    cy.contains('Total API Requests')
      .closest('[class*="card"]')
      .within(() => {
        cy.get('.text-2xl.font-bold').should('be.visible')
        cy.contains('Over the last 7 days').should('be.visible')
      })

    cy.contains('Avg. Requests/Day')
      .closest('[class*="card"]')
      .within(() => {
        cy.get('.text-2xl.font-bold').should('be.visible')
        cy.contains('Over the last 7 days').should('be.visible')
      })

    cy.contains('Requests Overview')
      .closest('[class*="card"]')
      .within(() => {
        cy.get('.recharts-responsive-container').should('be.visible')
      })
  })
})

describe('Device Insights', () => {})
