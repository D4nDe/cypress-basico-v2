/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function(){

        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Anderson')
        cy.get('#lastName').type('Castilho')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

        cy.get('#firstName').type('Anderson')
        cy.get('#lastName').type('Castilho')
        cy.get('#email').type('teste.gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor nao numerico', function(){

        cy.get('#phone')
        .type('asdasdasdas')
        .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').type('Anderson')
        cy.get('#lastName').type('Castilho')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
      
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName')
        .type('Anderson')
        .should('have.value', 'Anderson')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Castilho')
        .should('have.value', 'Castilho')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('teste@gmail.com')
        .should('have.value', 'teste@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('12345')
        .should('have.value', '12345')
        .clear()
        .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it.only('seleciona', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

  })
  