export interface IPost {
  slug: string
  title: string
  description: string
  body: string
  tagList: (string | null)[]
  createdAt: string
  updatedAt: string
  date: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}
