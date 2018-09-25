import {signUp,checkStatusLoggedIn} from '../../utils/common';

const randomstring = require('randomstring');

const username = randomstring.generate(); 
const email = `${username}@test.com`;
const password = 'greaterthanten';
describe('Status',()=>{
    it('should not display user info if a user is not logged in',()=>{
        cy 
        .visit('/status')
        .get('p').contains('You must be logged in to view this.')
        .get('a').contains('User Status').should('not.be.visible')
        .get('a').contains('Log Out').should('not.be.visible')
        .get('a').contains('Register')
        .get('a').contains('Log In')
        .get('.notification.is-success').should('not.be.visible');

    })

    it ('should display user info if a user is logged in',()=>{

        signUp(username,email,password);

        cy.wait(700);

        cy.visit('/status');
        cy.get('.navbar-burger').click();
        cy.contains('User Status').click();
        cy.get('li >strong').contains('User ID:')
          .get('li >strong').contains('Email:')
          .get('li').contains(email)
          .get('li > strong').contains('Username:')
          .get('a').contains('User Status')
          .get('a').contains('Log Out')
          .get('a').contains('Register').should('not.be.visible')
          .get('a').contains('Log In').should('not.be.visible')

    })

    it('should throw an error if the username is taken',()=>{

        cy 
        .visit('/register')
        .get('input[name="username"]').type(username)
        .get('input[name="email"]').type(`${email}unique`)
        .get('input[name="password"]').type(password)
        .get('input[type="submit"]').click();

        // assert user registeration failed
        cy.contains('All Users').should('not.be.visible');
        cy.contains('Register');
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
            .get('.notification.is-danger').contains('That user already exists.')

        
    })

    it('should throw an error if the email is taken',()=>{
        cy 
        .visit('/register')
        .get('input[name="username"]').type(`${username}unique`)
        .get('input[name="email"]').type(email)
        .get('input[name="password"]').type(password)
        .get('input[type="submit"]').click()

        // assert user registeration failed.
        cy.contains('All Users').should('not.be.visible')
        cy.contains('Register');
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
            .get('.notification.is-danger').contains('That user already exists.');
    });
});