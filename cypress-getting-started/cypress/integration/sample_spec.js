describe('Cypress Getting Started',()=>{
    it('Does not do much thing',()=>{
        cy.visit('https://example.cypress.io')
        cy.contains('type').click()
        cy.url().should('include','/commands/actions')
        
        cy.get('.action-email')
        .type('fake@email.com')
        .should('have.value','fake@email.com')
        cy.get('.action-div').dblclick().should('not.be.visible')
        cy.get('.action-input-hidden').should('be.visible')
    })
})



