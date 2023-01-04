import { PostsState } from '../redux/allPostsSlice'
import { UserState } from '../redux/userSlice'
import { OwnPostsState } from '../redux/ownPostSlice'

export type State = {
  posts: PostsState
  user: UserState
  articles: OwnPostsState
}
