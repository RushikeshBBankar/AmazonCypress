import linkName from '../fixtures/footerLink.json'

let length
export function footerCount() {
        it('Counts the number of links in the footer', () => {
                cy.get('.navFooterVerticalRow').within(() => {
                        cy.get('a').then(($value) => {
                                length = $value.length

                                cy.get('a').should('have.length', length).then((numLinks) => {
                                        cy.log(`Number of links in the footer: ${numLinks}`);
                                });
                        })
                })
        });
}

export function linkTestCases() {
        it('should be able to click on the About Us link in the footer and navigate to the About Us page', () => {
                cy.contains(linkName.AboutUs).rightclick().should('have.attr', 'href').then((href) => {
                        cy.log('The "Amazon Science" link URL is:', href);
                        cy.on('uncaught:exception', (err, runnable) => {
                                if (err.message.includes('Identifier \'submissionSuccessful\' has already been declared')) {
                                        // Ignore the error and continue with the test
                                        return false;
                                }
                        });
                        cy.visit(href, { failOnStatusCode: false });
                        cy.origin('https://www.aboutamazon.in/', () => {
                                cy.title().should('contain', 'About Amazon India - About Amazon India')
                                        .get('.PromoFastFacts-description').should('be.visible')
                                        .get('.Page-header-bar-logo').should('be.visible')
                                cy.contains('Newsfeed').should('be.visible')
                                cy.contains('Top stories').should('be.visible')
                                cy.get('.Tabs-tabs-container .Tabs-tabs a').first().contains('Trending Now').should('be.visible')
                                        .get('.Tabs-tabs-container .Tabs-tabs a').last().contains('Meet Us').should('be.visible')
                        })
                });
        })

        it('should be able to click on the Amazon Science link in the footer and navigate to the Amazon Science page', () => {
                cy.contains(linkName.AmazonScience).rightclick().should('have.attr', 'href').then((href) => {
                        cy.log('The "Amazon Science" link URL is:', href);
                        cy.visit(href, { failOnStatusCode: false });
                        cy.origin('https://www.amazon.science/', () => {
                                cy.title().should('contain', 'Amazon Science homepage')
                                cy.get('.Page-header-bar-logo .PageLogo-image').should('be.visible').and('have.attr', 'src', 'https://assets.amazon.science/07/d9/d204ca2242bea8215dbf9ca5c43e/amazon-science-logo.svg')
                                cy.contains('Customer-obsessed science').should('be.visible')
                                cy.get('.Page-header').should('be.visible')
                                cy.get('.Page-footer').should('be.visible')
                        })
                });
        })

        it('should be able to click on the Help link in the footer and navigate to the Help page', () => {
                cy.get('.navFooterLinkCol').find('.nav_last').contains(linkName.Help).click({ force: true })
                cy.url().should('include', '/gp/help/customer/')
                cy.title().should('contain', 'Help - Amazon Customer Service')
                cy.contains('Hello. What can we help you with?').should('be.visible')
                cy.get('#help-search-label').should('be.visible')
                cy.get('#helpsearch').should('be.visible').and('have.attr', 'maxlength', '100')
                cy.contains('Browse Help Topics').should('be.visible')
        })
}

