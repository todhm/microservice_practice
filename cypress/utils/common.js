

export const signUp=(username,email,password)=>{


    cy.visit('/register')
    .get('input[name="username"]').type(username)
    .get('input[name="email"').type(email)
    .get('input[name="password"').type(password)
    .get('input[type="submit"]').click()

}

export const logIn=(cy,email,password)=>{
    cy
    .get('input[name="email"]').type(email)
    .get('input[name="password"]').type(password)
    .get('input[type="submit"]').click()
    .wait(100);

}

export const checkStatusLoggedIn=()=>{
    cy.get('.navbar-burger').click();
    cy.get('.navbar-menu').within(()=>{
        cy
            .get('.navbar-item').contains('User Status')
            .get('.navbar-item').contains('Log Out')
            .get('.navbar-item').contains('Log In').should('not.be.visible')
            .get('.navbar-item').contains('Register').should('not.be.visible');
    });
}