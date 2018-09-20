import {signUp,checkStatusLoggedIn} from '../utils/common';

const randomstring = require('randomstring');
const username = randomstring.generate();
const email = `${username}@test.com`;
describe('Register',()=>{
    it('should display the registration form',()=>{
        cy 
        .visit('/register')
        .get('h1').contains('Register')
        .get('form');
    });

    it('should allow a user to register',()=>{

        //register user 
        signUp(username,email,'test1234!');

        cy.contains('All Users');
        cy.contains(username);
        checkStatusLoggedIn();

    })
})