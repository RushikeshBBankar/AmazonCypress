/// <reference types="Cypress" />
import productName from '../../fixtures/testData.json'
import {searchBestSellerBook,addTwoBookInCart,shortByPrice,addClothes,goToCartPage,verifyCartPage,verifyCheckoutPage,deleteCartItem} from '../../pages/searchAndCart'

describe('Amazon Book Search and Cart Validation', () => {
        before(() => {
                cy.HomePage()
                cy.logIn()
        })

        it('End-to-End Amazon.in Shopping Experience Test', () => {
                searchBestSellerBook()
                addTwoBookInCart()
                cy.Search_product(productName.productOne)
                shortByPrice()
                addClothes()
                goToCartPage()
                verifyCartPage()
                verifyCheckoutPage()
                cy.go('back')
                deleteCartItem()
        })

        after(()=>{
                cy.logOut() 
        })
})