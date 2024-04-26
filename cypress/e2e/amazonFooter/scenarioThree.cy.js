/// <reference types="Cypress" />
import {footerCount,linkTestCases} from '../../pages/footer'

describe('Amazon Footer Links', () => {
        context('Footer Length',()=>{
                
                before(() => {
                        cy.HomePage()
                })
        
                footerCount()
        })

        context('Verify The Links',()=>{

                beforeEach(()=>{
                        cy.HomePage()
                })

                linkTestCases()
        })
});