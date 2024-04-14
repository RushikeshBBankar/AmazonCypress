/// <reference types="Cypress" />
import {footetCount,linkTestCases} from '../../pages/footer'

describe('Amazon Footer Links', () => {
        context('Footer Length',()=>{
                
                before(() => {
                        cy.HomePage()
                })
        
                footetCount()
        })

        context('Verify The Links',()=>{

                beforeEach(()=>{
                        cy.HomePage()
                })

                linkTestCases()
        })
});