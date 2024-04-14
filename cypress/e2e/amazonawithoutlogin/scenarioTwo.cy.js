import productName from '../../fixtures/testData.json'

describe('Prevent Adding Product to Wishlist and Checkout Without Login',()=>{
        beforeEach(()=>{
                cy.HomePage()
        })

        it('verify the user should not be able to add product into the wishlist',()=>{
                cy.Search_product(productName.productTree)
                selectClickVerify(productName.AddToWishList)
        })

        it('verify the user should not be able to checkout without login',()=>{
                cy.Search_product(productName.productTwo)
                selectClickVerify(productName.BuyNow)
        })
})

function selectClickVerify(button){
        cy.selectProduct()
        cy.get(button).click()
        cy.verifySignInPage()
}