
var firstBookTitle
let firstBookPrice
let secondBookTitle
let secondBookPrice
let M_Size_clothe_Name
let M_Size_clothe_Price
let L_Size_clothe_Name
let L_Size_clothe_Price

export function searchBestSellerBook() {
        cy.get('#nav-xshop-container').contains('Best Sellers').should('be.visible').click()
        cy.get('div[role="group"]').find('a').contains('Book').should('be.visible').click()
        cy.get('#zg-left-col').contains('Health, Family & Personal Development').should('be.visible').click()
        cy.get('#zg-left-col').contains('Self-Help').should('be.visible').click()
        cy.get('#zg-left-col').contains('Abuse').should('be.visible').click()
}

export function addTwoBookInCart() {
        cy.url().then((bestSellerPage) => {
                cy.get('#gridItemRoot #p13n-asin-index-0').within((firstBook) => {
                        cy.get('.zg-grid-general-faceout .a-link-normal span').first().invoke('text').then((bookNameDetails) => {
                                firstBookTitle = bookNameDetails
                        })
                        cy.get('.zg-grid-general-faceout .a-link-normal span').last().invoke('text').then((bookPriceDetails) => {
                                firstBookPrice = bookPriceDetails.slice(1, 7)
                        })
                        cy.get(firstBook).click()
                })

                cy.contains('Add to Cart').should('be.visible').click()

                cy.visit(bestSellerPage)

                cy.get('#gridItemRoot #p13n-asin-index-1').within((secondBook) => {
                        cy.get('.zg-grid-general-faceout .a-link-normal span').first().invoke('text').then((bookNameDetails) => {
                                secondBookTitle = bookNameDetails
                        })
                        cy.get('.zg-grid-general-faceout .a-link-normal span').last().invoke('text').then((bookPriceDetails) => {
                                secondBookPrice = bookPriceDetails.slice(1, 7)
                        })
                        cy.get(secondBook).click()

                })
                cy.contains('Add to Cart').should('be.visible').click()

        })
}

export function shortByPrice() {
        cy.get('.a-dropdown-label').last().click()
        cy.get('.a-dropdown-item').contains('Price: Low to High').should('be.visible').click()
}

export function addClothes() {
        cy.url().then((sweaterSearchPage) => {
                cy.get('.a-declarative .a-spacing-base').first().within((L_Size_clothe) => {
                        cy.get('.a-size-base-plus.a-color-base.a-text-normal').first().invoke('text').then((clotheName) => {
                                L_Size_clothe_Name = clotheName
                        })
                        cy.get('.a-price-whole').first().invoke('text').then((clothePrice) => {
                                L_Size_clothe_Price = clothePrice
                        })
                        cy.get('.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2').find('a').invoke('removeAttr', 'target').click()
                })
                cy.get('#native_dropdown_selected_size_name').select('M')
                cy.get('#native_dropdown_selected_size_name').contains('M').should('be.visible')
                cy.contains('Add to Cart').should('be.visible').click()

                cy.visit(sweaterSearchPage)
                
                cy.get('.a-declarative .a-spacing-base').eq(3).within((M_Size_clothe) => {
                        cy.get('.a-size-base-plus.a-color-base.a-text-normal').first().invoke('text').then((clotheName) => {
                                M_Size_clothe_Name = clotheName
                        })

                        cy.get('.a-price-whole').first().invoke('text').then((clothePrice) => {
                                M_Size_clothe_Price = clothePrice
                        })

                        cy.get('.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2').find('a').invoke('removeAttr', 'target').click()
                })
                cy.get('#native_dropdown_selected_size_name').select('L')
                cy.get('#native_dropdown_selected_size_name').contains('L').should('be.visible')
                cy.contains('Add to Cart').should('be.visible').click()
        })
}

export function goToCartPage() {
        cy.get('#nav-cart').should('be.visible').click()
}

export function verifyCartPage() {
        cy.get('.sc-grid-item-product-title .sc-grid-item-product-title').first().invoke('text').then((M_size) => {
                expect(M_size).to.contain(M_Size_clothe_Name)
        })

        cy.get('.a-size-medium.sc-product-price').first().invoke('text').then((M_Price) => {
                expect(M_Price).to.contain(M_Size_clothe_Price)
        })

        cy.get('.sc-grid-item-product-title .sc-grid-item-product-title').eq(1).invoke('text').then((L_size) => {
                expect(L_size).to.contain(L_Size_clothe_Name)
        })

        cy.get('.a-size-medium.sc-product-price').eq(1).invoke('text').then((L_Price) => {
                expect(L_Price).to.contain(L_Size_clothe_Price)
        })

        cy.get('.sc-grid-item-product-title .sc-grid-item-product-title').eq(2).invoke('text').then((secondBookName) => {
                expect(secondBookName).to.contain(secondBookTitle)
        })

        cy.get('.a-size-medium.sc-product-price').eq(2).invoke('text').then((secondBookCost) => {
                expect(secondBookCost).to.contain(secondBookPrice)
        })

        cy.get('.sc-grid-item-product-title .sc-grid-item-product-title').last().invoke('text').then((firstBookName) => {
                expect(firstBookName).to.contain(firstBookTitle)
        })

        cy.get('.a-size-medium.sc-product-price').last().invoke('text').then((firstBookCost) => {
                expect(firstBookCost).to.contain(firstBookPrice)
        })

        cy.get('#sc-subtotal-amount-activecart').should('be.visible').invoke('text').then((totalAmount) => {
                if (totalAmount > 2000) {
                        cy.log('Total amount exceeds Rs 2000/-')
                } else {
                        cy.log('Total amount is within Rs 2000/-')
                }
        })
}

export function verifyCheckoutPage() {
        cy.get('[data-feature-id="proceed-to-checkout-action"]').should('be.visible').click()
        cy.contains('Checkout').should('be.visible')
        cy.contains('Enter a new shipping address').should('be.visible')
        cy.contains('Order Summary').should('be.visible')
}

export function deleteCartItem() {
        cy.get('.a-size-small.sc-action-delete [type="submit"]').then(($element)=>{
                for(let i=$element.length-1; i>=0; i--){
                        cy.get('.a-size-small.sc-action-delete [type="submit"]').eq(i).click({ shiftKey: true })
                        cy.wait(1200)
                        cy.window().then(win => {
                                win.close();
                        });
                        goToCartPage()
                }
        })
        cy.get('.a-spacing-mini.a-spacing-top-base').should('contain', 'Your Amazon Cart is empty.')
}