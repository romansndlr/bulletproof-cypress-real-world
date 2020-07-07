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

          cy.wrap($articlePreview)
            .as('articlePreview')
            .findByRole('img')
            .should('have.attr', 'src', article.author.image)

          // Addressed in step 3
          // cy.get('@articlePreview').findByRole('link').should('exist')

          cy.get('@articlePreview')
            .findByText(
              Cypress.moment(article.createdAt).format(
                DateFormats.ArticlePreview
              )
            )
            .should('exist')

          cy.get('@articlePreview')
            .findByRole('button')
            .should('contain', article.favoritesCount)

          cy.get('@articlePreview')
            .findByRole('heading')
            .should('have.text', article.title)

          cy.get('@articlePreview')
            .findByText(article.description)
            .should('exist')

          if (Cypress._.isEmpty(article.tagList)) {
            cy.get('@articlePreview').findByRole('list').should('be.empty')
          } else {
            cy.get('@articlePreview')
              .findAllByRole('listitem')
              .each(($tag, tagIndex) => {
                expect($tag).to.have.text(article.tagList[tagIndex])
              })
          }
        })
    })
  })
})
