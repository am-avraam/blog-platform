import { PostsState } from '../redux/firtsSlice'
import { UserState } from '../redux/userSlice'

export type State = {
  posts: PostsState
  user: UserState
}
