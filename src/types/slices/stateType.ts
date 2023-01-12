import { PostsState } from './allPostsTypes'
import { UserState } from './userTypes'
import { OwnPostsState } from './ownPostsTypes'

export type StateType = {
  posts: PostsState
  user: UserState
  articles: OwnPostsState
}
