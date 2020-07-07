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

      cy.get('div.article-preview')
        .should('have.length', articles.length)
        .each(($articlePreview, index) => {
          const article: Article = articles[index]

          cy.wrap($articlePreview)
            .as('articlePreview')
            .find('div.article-meta > a > img')
            .should('have.attr', 'src', article.author.image)

          cy.get('@articlePreview')
            .find('div.article-meta > div.info > a.author')
            .should('have.text', article.author.username)

          cy.get('@articlePreview')
            .find('div.article-meta > div.info > span.date')
            .should(
              'have.text',
              Cypress.moment(article.createdAt).format(
                DateFormats.ArticlePreview
              )
            )

          cy.get('@articlePreview')
            .find('div.article-meta > div.pull-xs-right > button.btn')
            .should('contain', article.favoritesCount)

          cy.get('@articlePreview')
            .find('a.preview-link > h1')
            .should('have.text', article.title)

          cy.get('@articlePreview')
            .find('a.preview-link > p')
            .should('have.text', article.description)

          if (Cypress._.isEmpty(article.tagList)) {
            cy.get('@articlePreview')
              .find('a.preview-link > ul.tag-list')
              .should('be.empty')
          } else {
            cy.get('@articlePreview')
              .find('a.preview-link > ul.tag-list > li.tag-default')
              .each(($tag, tagIndex) => {
                expect($tag).to.have.text(article.tagList[tagIndex])
              })
          }
        })
    })
  })
})
