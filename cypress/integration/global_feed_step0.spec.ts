describe('Global Feed', () => {
  beforeEach(() => {
    cy.server()

    cy.route('**/api/articles**', 'fx:global_feed.json').as('getArticles')
  })

  it('Should show all articles correctly', () => {
    cy.visit('/')

    cy.get('div.article-preview').should('have.length', 3)

    // Article 1 start
    cy.get('div.article-preview')
      .eq(0)
      .find('div.article-meta > a > img')
      .should(
        'have.attr',
        'src',
        'https://s3.amazonaws.com/uifaces/faces/twitter/praveen_vijaya/128.jpg'
      )

    cy.get('div.article-preview')
      .eq(0)
      .find('div.article-meta > div.info > a.author')
      .should('have.text', 'user1')

    cy.get('div.article-preview')
      .eq(0)
      .find('div.article-meta > div.info > span.date')
      .should('have.text', 'Mon Jun 22 2020')

    cy.get('div.article-preview')
      .eq(0)
      .find('div.article-meta > div.pull-xs-right > button.btn')
      .should('contain', '0')

    cy.get('div.article-preview')
      .eq(0)
      .find('a.preview-link > h1')
      .should('have.text', 'Article 1')

    cy.get('div.article-preview')
      .eq(0)
      .find('a.preview-link > p')
      .should('have.text', 'This is article 1 description')

    cy.get('div.article-preview')
      .eq(0)
      .find('a.preview-link > ul.tag-list > li.tag-default')
      .eq(0)
      .should('have.text', 'tag1')

    cy.get('div.article-preview')
      .eq(0)
      .find('a.preview-link > ul.tag-list > li.tag-default')
      .eq(1)
      .should('have.text', 'tag2')
    // Article 1 end

    // Article 2 start
    cy.get('div.article-preview')
      .eq(1)
      .find('div.article-meta > a > img')
      .should(
        'have.attr',
        'src',
        'https://s3.amazonaws.com/uifaces/faces/twitter/praveen_vijaya/128.jpg'
      )

    cy.get('div.article-preview')
      .eq(1)
      .find('div.article-meta > div.info > a.author')
      .should('have.text', 'user1')

    cy.get('div.article-preview')
      .eq(1)
      .find('div.article-meta > div.info > span.date')
      .should('have.text', 'Sun Jun 28 2020')

    cy.get('div.article-preview')
      .eq(1)
      .find('div.article-meta > div.pull-xs-right > button.btn')
      .should('contain', '1')

    cy.get('div.article-preview')
      .eq(1)
      .find('a.preview-link > h1')
      .should('have.text', 'Article 2')

    cy.get('div.article-preview')
      .eq(1)
      .find('a.preview-link > p')
      .should('have.text', 'This is article 2 description')

    cy.get('div.article-preview')
      .eq(1)
      .find('a.preview-link > ul.tag-list > li.tag-default')
      .eq(0)
      .should('have.text', 'tag1')
    // Article 2 end

    // Article 3 start
    cy.get('div.article-preview')
      .eq(2)
      .find('div.article-meta > a > img')
      .should(
        'have.attr',
        'src',
        'https://s3.amazonaws.com/uifaces/faces/twitter/nilshelmersson/128.jpg'
      )

    cy.get('div.article-preview')
      .eq(2)
      .find('div.article-meta > div.info > a.author')
      .should('have.text', 'user2')

    cy.get('div.article-preview')
      .eq(2)
      .find('div.article-meta > div.info > span.date')
      .should('have.text', 'Thu Jun 25 2020')

    cy.get('div.article-preview')
      .eq(2)
      .find('div.article-meta > div.pull-xs-right > button.btn')
      .should('contain', '0')

    cy.get('div.article-preview')
      .eq(2)
      .find('a.preview-link > h1')
      .should('have.text', 'Article 3')

    cy.get('div.article-preview')
      .eq(2)
      .find('a.preview-link > p')
      .should('have.text', 'This is article 3 description')

    cy.get('div.article-preview')
      .eq(2)
      .find('a.preview-link > ul.tag-list')
      .should('be.empty')
    // Article 3 end
  })
})
