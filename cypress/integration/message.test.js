import {signUp,logIn,checkStatusLoggedIn} from '../utils/common';

const randomstring = require('randomstring');
const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';

describe('Message',()=>{
    it('should display flash messages correctly',()=>{
        signUp(username,email,password);

        cy
            .get('.notification.is-success').contains('Welcome!')
            .get('.delete').click()
            .get('.notification.is-success').should('not.be.visible');
        
        cy.get('.navbar-burger').click();
        cy.contains('Log Out').click();

        logIn(cy .visit('/login'),'incorrect@email.com',password);

        cy
            .get('.notification.is-success').should('not.be.visible')
            .get('.notification.is-danger').contains('User does not exists.')

        logIn(cy.visit('/login'),email,password);

        cy
        .get('.notification.is-success').contains('Welcome!')
        .get('.notification.is-danger').should('not.be.visible');

        cy .get('.navbar-burger').click(); 
        cy.contains('Log Out').click(); 

        cy 
            .contains('Log In').click();
        logIn(cy,email,password);

        cy 
            .get('.notification.is-success').contains('Welcome!')
            .wait(4000)
            .get('.notification.is-success').should('not.be.visible');
    });
})