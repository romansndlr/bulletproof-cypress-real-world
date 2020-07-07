declare interface User {
  username: string
  bio: string
  image: string
  following: boolean
}

declare interface Article {
  title: string
  slug: string
  body: string
  createdAt: Date
  updatedAt: Date
  tagList: string[]
  description: string
  author: User
  favorited: boolean
  favoritesCount: number
}

interface GetArticles {
  articles: Article[]
  articlesCount: number
}
