import userData from '../fixtures/userData.json'

describe('Usuario', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Quando as credenciais estiverem corretas, o usuário deve ser logado', () => {
    cy.fixture('userData').as('user')

    cy.get('#username').type(userData.usuario)
    cy.get('#senha').type(userData.senha, {log:false})

    cy.intercept('POST', '/bff/login').as('postLogin')
    cy.get('[onclick*=login]').click()
    cy.wait('@postLogin')
    cy.contains('h4', 'Realizar Transferência').should('not.be.hidden')
  })
})