import { configureStore } from '@reduxjs/toolkit'

import postReducer from './firtsSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
