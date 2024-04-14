Cypress.Commands.add('HomePage', () => {
        cy.visit('/')
        cy.title().should('contain', 'Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in')
})

Cypress.Commands.add('logIn', () => {
        cy.get('#nav-link-accountList').click()
        cy.verifySignInPage()
        cy.get('#ap_email').clear().type(Cypress.config('userName'))
        cy.get('#continue').click()
        cy.get('#ap_password').type(Cypress.config('password'))
        cy.get('#signInSubmit').click()
})

Cypress.Commands.add('logOut',()=>{
        cy.get('#nav-link-accountList').trigger('mouseover')
        cy.get('#nav-al-your-account #nav-item-signout').click()
})


Cypress.Commands.add('Search_product', (product) => {
        cy.get('#twotabsearchtextbox').type(product).type('{enter}')
})

Cypress.Commands.add('verifySignInPage', () => {
        cy.title().should('contain', 'Amazon Sign In')
        cy.get('.a-spacing-small').contains('Sign in').should('be.visible')
        cy.get('.a-form-label').contains('Email or mobile phone number').should('be.visible')
        cy.title().should('contain', 'Amazon Sign In')
        cy.get('.a-button-input').should('be.visible').and('have.attr', 'type', 'submit')
        cy.get('#createAccountSubmit').contains('Create your Amazon account').should('be.visible').and('have.attr', 'href')
})

Cypress.Commands.add('selectProduct', () => {
        cy.get('.a-link-normal.s-no-outline').first().invoke('removeAttr', 'target').click()
})