import { IPost } from '../../models/IPost'

export type OwnPostsState = {
  myposts: IPost[]
  loading: boolean
  status: string | null
  error: string | null
  message: string
  updated: boolean
  created: string | null
}
