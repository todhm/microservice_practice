import {signUp,logIn,checkStatusLoggedIn} from '../utils/common';

const randomstring = require('randomstring');
const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';

describe('Login',()=>{
    it('should display the sign in form',()=>{
        cy
        .visit('/login')
        .get('h1').contains('Login')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list')
        .get('.validation-list > .error').first().contains('Email is required.')
    })
    

    it('should allow a user to sign in',()=>{
        signUp(username,email,password);

        cy.get('.navbar-burger').click(); 
        cy.contains('Log Out').click(); 

        cy
            .get('a').contains('Log In').click()
            .get('input[name="email"]').type(email)
            .get('input[name="password"]').type(password)
            .get('input[type="submit"]').click()
            .wait(100);
        
        cy.contains('All Users');
        cy
            .get('table')
            .find('tbody > tr').last()
            .find('td').contains(username);
        cy.get('.notification.is-success').contains('Welcome!');
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

    it('should throw an error if the credentials are incorrect',()=>{

        cy
            .visit('/login')
        logIn(cy,'incorrect@email.com',password);

        cy.contains('All Users').should('not.be.visible');
        cy.contains('Login');
        cy.get('.navbar-burger').click(); 
        cy.get('.navbar-menu').within(()=>{
            cy
            .get('.navbar-item').contains('User Status').should('not.be.visible')
            .get('.navbar-item').contains('Log Out').should('not.be.visible')
            .get('.navbar-item').contains('Log In')
            .get('.navbar-item').contains('Register');
        });
        cy
        .get('.notification.is-success').should('not.be.visible')
        .get('.notification.is-danger').contains('User does not exists.');

        cy 
        .get('a').contains('Log In').click() 
        .get('input[name="email"]').type(email)
        .get('input[name="password"]').type('incorrectpassword')
        .get('input[type="submit"]').click()
        .wait(100);

        cy.contains('All Users').should('not.be.visible');
        cy.contains("Login");
        cy.get('.navbar-burger').click(); 
        cy.get('.navbar-menu').within(()=>{
            cy 
            .get('.navbar-item').contains('User Status').should('not.be.visible')
            .get('.navbar-item').contains('Log Out').should('not.be.visible')
            .get('.navbar-item').contains('Log In')
            .get('.navbar-item').contains('Register');

        });
        cy
            .get('.notification.is-success').should('not.be.visible')
            .get('.notification.is-danger').contains('User does not exists.');

    })
})