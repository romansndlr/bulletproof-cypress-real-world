import { DateFormats } from '../support/enums'

describe('Global Feed', () => {
  beforeEach(() => {
    cy.server()

    cy.route('**/api/articles**', 'fx:global_feed.json').as('getArticles')
  })

  it('Should show all articles correctly', () => {
    cy.visit('/')

    cy.wait('@getArticles').then((xhr) => {
      const { articles } = xhr.responseBody as GetArticles

      cy.findAllByTestId('article-preview')
        .should('have.length', articles.length)
        .each(($articlePreview, index) => {
          const article: Article = articles[index]

          cy.wrap($articlePreview).within(() => {
            cy.findByRole('img', { name: /Article author avatar/i }).should(
              'have.attr',
              'src',
              article.author.image
            )

            cy.findByRole('link', { name: article.author.username }).should(
              'exist'
            )

            cy.findByText(
              Cypress.moment(article.createdAt).format(
                DateFormats.ArticlePreview
              )
            ).should('exist')

            cy.findByRole('button', { name: /Favorite article/i }).should(
              'contain',
              article.favoritesCount
            )

            cy.findByRole('heading', { name: article.title }).should('exist')

            cy.findByText(article.description, { selector: 'p' }).should(
              'exist'
            )

            cy.findByRole('list', { name: /Tags/i }).within(($tagList) => {
              if (Cypress._.isEmpty(article.tagList)) {
                expect($tagList).to.be.empty
              } else {
                cy.findAllByRole('listitem').each(($tag, tagIndex) => {
                  expect($tag).to.have.text(article.tagList[tagIndex])
                })
              }
            })
          })
        })
    })
  })
})
