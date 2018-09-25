import {signUp,checkStatusLoggedIn} from '../utils/common';

const randomstring = require('randomstring');
const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';

describe('Register',()=>{
    it('should display the registration form',()=>{
        cy 
        .visit('/register')
        .get('h1').contains('Register')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list')
        .get('.validation-list > .error').first().contains(
            'Username must be greater than 5 characters.'
        );
    });

    it('should allow a user to register',()=>{

        //register user 
        signUp(username,email,password);

        cy.contains('All Users');
        cy.contains(username);
        checkStatusLoggedIn();

    })
    it('should validate the password field',()=>{
        cy
        .visit('/register')
        .get('H1').contains('Register')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list > .error').contains(
            'Password must be greater than 10 characters.'
        ).get('input[name="password"]').type(password)
        .get('.validation-list')
        .get('.validation-list > .error').contains(
            'Password must be greater than 10 characters.'
        ).should('not.be.visible')
        .get('.validation-list > .success').contains(
            'Password must be greater than 10 characters.'
        );

        cy.get('.navbar-burger').click(); 
        cy.get('.navbar-item').contains('Log In').click(); 
        cy.get('.navbar-item').contains('Register').click();
        cy.get('.validation-list > .error').contains(
            'Password must be greater than 10 characters.'
        );
    })
})