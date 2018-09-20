import {signUp,checkStatusLoggedIn} from '../utils/common';

const randomstring = require('randomstring');
const username = randomstring.generate();
const email = `${username}@test.com`;

describe('Login',()=>{
    it('should display the sign in form',()=>{
        cy
        .visit('/login')
        .get('h1').contains('Login')
        .get('form')
    })

    it('should allow a user to sign in',()=>{
        signUp(username,email,'test1234!');

        cy.get('.navbar-burger').click(); 
        cy.contains('Log Out').click(); 

        cy
            .get('a').contains('Log In').click()
            .get('input[name="email"]').type(email)
            .get('input[name="password"]').type('test1234!')
            .get('input[type="submit"]').click()
            .wait(100);
        
        cy.contains('All Users');
        cy
            .get('table')
            .find('tbody > tr').last()
            .find('td').contains(username);

        checkStatusLoggedIn();
        cy.get('.navbar-burger').click();
        cy
        .get('.navbar-item').contains('Log Out').click(); 
        cy.get('p').contains('You are now logged out');
        cy.get('.navbar-menu').within(()=>{
            cy 
                .get('.navbar-item').contains('User Status').should('not.be.visible')
                .get('.navbar-item').contains('Log Out').should('not.be.visible')
                .get('.navbar-item').contains('Log In')
                .get('.navbar-item').contains('Register');
        })

    })
})