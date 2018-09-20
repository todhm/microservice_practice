describe('Index',()=>{
    it('users should be able to view the "/ page',()=>{
        cy
          .visit('/')
          .get('h1').contains('All Users');
    })
    context('Browser',()=>{
        beforeEach(()=>{
            cy.viewport('macbook-11')
        })
        it('You should be able to click new page',()=>{
          cy
            .visit('/')
            .get('strong[class="navbar-item"]').click();
        })  
        
    })
    context('mobile',()=>{
        beforeEach(()=>{
            cy.viewport('iphone-6+')
        })
        it('You should be able to view burger',()=>{
          cy
            .visit('/')
            .get('.navbar-burger').click()
            .get('a').contains('User Status').should('not.be.visible')
            .get('a').contains('Log Out').should('not.be.visible')
            .get('a').contains('Register')
            .get('a').contains('Log In');
        })  
        
    })

})