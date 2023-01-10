import { IPost } from '../../models/IPost'

export type PostsState = {
  posts: IPost[]
  status: string | null
  error: string | null | unknown
  pagesCount: number
  currentPage: number
  actualPost: IPost | undefined
}

export type Response = {
  articles: IPost[]
  articlesCount: number
}

export type FavoriteResponse = {
  article: IPost
}

export type ToggleResponse = [number, IPost[], number]

export type ToggleLikeArgs = [string, boolean | undefined]
