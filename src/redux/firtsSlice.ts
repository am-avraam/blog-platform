/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { type } from 'os'

import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import formatPost from '../services/formatPost'
import { IPost } from '../models/IPost'

export type PostsState = {
  posts: IPost[]
  status: string | null
  error: string | null | unknown
  pagesCount: number
  currentPage: number
}

export type Response = {
  articles: IPost[]
  articlesCount: number
}

export type ToggleResponse = [number, Response]

const initialState: PostsState = {
  posts: [],
  status: null,
  error: null,
  pagesCount: 0,
  currentPage: 1,
}

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

export const fetchPosts = createAsyncThunk<Response, undefined, { rejectValue: string }>(
  'posts/fetchPosts',
  async function (_, { rejectWithValue }) {
    const response = await fetch('https://blog.kata.academy/api/articles?limit=5')
    if (!response.ok) {
      return rejectWithValue('Server error')
    }
    const data = await response.json()

    return data
  }
)

export const togglePage = createAsyncThunk<ToggleResponse, number, { rejectValue: string }>(
  'posts/togglePage',
  async function (num: number, { rejectWithValue }) {
    const limit = 5
    const skip = num * limit - limit

    const response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${skip}`)
    if (!response.ok) {
      return rejectWithValue('Server Error')
    }
    const data = await response.json()

    return [num, data]
  }
)

const setLoading = (state: PostsState) => {
  state.status = 'loading'
  state.error = null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.posts = action.payload.articles
        state.pagesCount = action.payload.articlesCount
      })

      .addCase(fetchPosts.pending, setLoading)

      .addCase(togglePage.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.posts = action.payload && action.payload[1] && formatPost(action.payload[1].articles)
        state.currentPage = action.payload && action.payload[0]
        state.pagesCount = action.payload && action.payload[1].articlesCount
      })

      .addCase(togglePage.pending, setLoading)

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.status = 'rejected'
      })
  },
})

// export const { one, } = postsSlice.actions

export default postsSlice.reducer
