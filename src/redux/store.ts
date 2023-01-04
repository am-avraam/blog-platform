import { configureStore } from '@reduxjs/toolkit'

import postReducer from './allPostsSlice'
import userReducer from './userSlice'
import articleReducer from './ownPostSlice'

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
    articles: articleReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
