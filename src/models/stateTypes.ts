import { PostsState } from '../types/slices/allPostsTypes'
import { UserState } from '../types/slices/userTypes'
import { OwnPostsState } from '../types/slices/ownPostsTypes'

export type State = {
  posts: PostsState
  user: UserState
  articles: OwnPostsState
}
