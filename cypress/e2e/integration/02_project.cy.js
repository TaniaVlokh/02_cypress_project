/// <reference types="cypress" />
describe('Project - 2', () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-2")
  })

  it('Test Case 01 - Validate the login form', () =>{
    cy.get('#username').should('be.visible').and('not.have.attr', 'required');
    cy.get('[for="username"]').should('have.text', 'Please enter your username');
    cy.get('#password').should('be.visible').and('not.have.attr', 'required');
    cy.get('[for="password"]').should('have.text', 'Please enter your password');
    cy.get('#login_btn').should('be.visible').and('be.enabled').and('have.text', 'LOGIN');
    cy.get('#login_btn').next().should('be.visible').and('have.text', 'Forgot Password?')//.and('be.enabled');
  })

  it('Test Case 02 - Validate the valid login', () => {
    const userName = 'TechGlobal';
    const password = 'Test1234';
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#login_btn').click();
    cy.get('#success_lgn,#logout').should('be.visible')
  })

  it('Test Case 03 - Validate the logout', () => {
    const userName = 'TechGlobal';
    const password = 'Test1234';
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#login_btn').click();
    cy.get('#logout').click();
    cy.get('[class*="LoginForm_form"]').should('be.visible')
  })

  it('Test Case 04 - Validate the Forgot Password? Link and Reset Password modal', () => {
    cy.get('#login_btn').next().realClick();
    cy.get('#modal_title,.delete,#email').should('be.visible')
    cy.get('[for="email"]').should('have.text', 'Enter your email address and we\'ll send you a link to reset your password. ')
    cy.get('#submit').should('be.visible').and('be.enabled').and('have.text', 'SUBMIT')
  })

  it('Test Case 05 - Validate the Reset Password modal close button', () => {
    cy.get('#login_btn').next().realClick();
    cy.get('#modal_title').should('be.visible')
    cy.get('.delete').realClick()
    cy.get(".modal.is-active").should("not.exist");
  })

  it('Test Case 06 - Validate the Reset Password form submission', () => {
    const resetPassword = 'test123@gmail.com'
    cy.get('#login_btn').next().realClick();
    cy.get('#email').type(resetPassword);
    cy.get('#submit').realClick();
    cy.get('#confirmation_message').should('have.text', 'A link to reset your password has been sent to your email address.');

  })

  
  const testCases = [
    {
      description: 'Validate the invalid login with the empty credentials',
      userName: ' ',
      password: ' ',
      errorMessage: 'Username'
  },
    {
      description: 'Validate the invalid login with the wrong username',
      userName: 'John',
      password: 'Test1234',
      errorMessage: 'Username'
    },
    {
      description: 'Validate the invalid login with the wrong password',
      userName: 'TechGlobal',
      password: '1234',
      errorMessage: 'Password'
    },
    {
      description: ' Validate the invalid login with the wrong username and password',
      userName: 'John',
      password: '1234',
      errorMessage: 'Username'
    }
  ]
  testCases.forEach((test, index) => {
    it(`Test Case ${index + 7} - ${test.description}`, () => {
    cy.get('#username').type(test.userName);
    cy.get('#password').type(test.password);
    cy.get('#login_btn').realClick()
    cy.get('#error_message').should('have.text', `Invalid ${test.errorMessage} entered!`)
    })
  })
})