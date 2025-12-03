describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() =>{
    cy.visit('./src/index.html')
  })
  //it('verifica o título da aplicação', () => {
  //  cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  //})
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Jozias')
    cy.get('#lastName').type('Adriano Streit')
    cy.get('#email').type('jozias.adriano@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Jozias')
    cy.get('#lastName').type('Adriano Streit')
    cy.get('#email').type('jozias.adriano')
    cy.get('#open-text-area').type("Obrigado!")
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')  
  })
it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
cy.get('#phone')
  .type('abc')
  .should('have.value','')
  })

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario', () =>{
  cy.get('#firstName').type('Jozias')
  cy.get('#lastName').type('Adriano Streit')
  cy.get('#email').type('jozias.adriano@gmail.com')
  cy.get('#open-text-area').type('Obrigado!')
  cy.get('#phone-checkbox').click()
  cy.get('.phone-label-span').should('be.visible')
  cy.contains('button','Enviar').click()
  cy.get('.error').should('be.visible') 

})

it('preenche e limpa os campos nome, sobrenome, email e telefone',() =>{
  cy.get('#firstName')
    .type('Jozias')
    .should('have.value', 'Jozias')
    .clear()
    .should('have.value','')
  cy.get('#lastName')
    .type('Adriano Streit')
    .should('have.value', 'Adriano Streit')
    .clear()
    .should('have.value','')
  cy.get('#email')
    .type('jozias.adriano@gmail.com')
    .should('have.value', 'jozias.adriano@gmail.com')
    .clear()
    .should('have.value','')
  cy.get('#phone')
    .type('51999181307')
    .should('have.value', '51999181307')
    .clear()
    .should('have.value','')
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() =>{
  cy.get('button[type="submit"]').click()
   cy.get('.error').should('be.visible') 
})
it('envia o formuário com sucesso usando um comando customizado', () => {
  const data = {
    firstName: 'Jozias',
    lastName: 'Adriano Streit',
    email: 'jozias.adriano@gmail.com',
    text: 'Teste.'
  }
   cy.fillMandatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible')

})
it('envia o formuário com sucesso usando um comando customizado 2', () => {
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')

})
it('Preenche formulário valida erro corrige e envia com sucesso',() => {
  const longText = Cypress._.repeat('teste123', 2)

  cy.get('#firstName').type('Jozias')
  cy.get('#lastName').type('Adriano Streit')
  cy.get('#email').type(longText, {delay: 0})
  cy.get('#open-text-area').type('Obrigado!')
  cy.contains('button','Enviar').click()
  cy.get('.error').should('be.visible') 
  cy.get('#email')
    .should('have.value', longText)
    .clear()
  cy.get('#email').type('jozias.adriano@gmail.com')
  cy.get('#email').should('have.value', 'jozias.adriano@gmail.com')
  cy.get(':nth-child(3) > input').click()

  cy.contains('button','Enviar').click()
  cy.get('.success').should('be.visible')
  })


  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').select('YouTube')
    .should('have.value', 'youtube')
    
  })
it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select').select('mentoria')
    .should('have.value', 'mentoria')
})

it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1)
    .should('have.value', 'blog')
})

it('marca o tipo de atendimento "Feedback"', () =>{
cy.get('input[type="radio"][value="feedback"]').check()
.should('be.checked')

})
it('marca cada tipo de atendimento', () => {
cy.get('input[type="radio"]')
  .each(typeOfService => {
    cy.wrap(typeOfService)
      .check()
      .should('be.checked')
  })
})
it('marca ambos checkboxes, depois desmarca o último', () => {
cy.get('input[type="checkbox"]')
.check()
.should('be.checked')
.last()
.uncheck()
.should('not.be.checked')
})
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario check', () =>{
  cy.get('#firstName').type('Jozias')
  cy.get('#lastName').type('Adriano Streit')
  cy.get('#email').type('jozias.adriano@gmail.com')
  cy.get('#open-text-area').type('Obrigado!')
  cy.get('#phone-checkbox').check().should('be.checked')
  cy.get('.phone-label-span').should('be.visible')
  cy.contains('button','Enviar').click()
  cy.get('.error').should('be.visible') 
})
it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json')
  .should(input =>{
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo simulando um drag-and-drop(arrastar e soltar)',() => {
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json', {action: 'drag-drop' })
  .should(input =>{
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('eleciona um arquivo utilizando uma fixture para a qual foi dada um alias',() => {
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
  .selectFile('@sampleFile')
  .should(input =>{
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',() =>{
  cy.contains('a', 'Política de Privacidade')
  .should('have.attr', 'href', 'privacy.html')
  .and('have.attr', 'target', '_blank')  
})

it('acessa a página da política de privacidade removendo o target e então clicando no link',() =>{
  cy.contains('a', 'Política de Privacidade')
  .invoke('removeAttr', 'target')
  .click()

  cy.contains('h1', 'CAC TAT - Política de Privacidade')
  .should('be.visible')
})

})