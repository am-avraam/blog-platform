import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import formatPost from '../lib/formatPost'
import { IPost } from '../models/IPost'
import { PostsState, Response, ToggleResponse, ToggleLikeArgs } from '../types/slices/allPostsTypes'

import { updatePost } from './ownPostSlice'

const initialState: PostsState = {
  posts: [],
  status: null,
  error: null,
  pagesCount: 0,
  currentPage: 1,
  actualPost: undefined,
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

    let response
    if (!localStorage.getItem('token')) {
      response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${skip}`)
    } else {
      response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${skip}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    }

    if (!response.ok) {
      return rejectWithValue('Server Error')
    }
    const data = await response.json()
    const formattedPosts = formatPost(data.articles)
    const count = data.articlesCount
    return [num, formattedPosts, count]
  }
)

export const likeToggle = createAsyncThunk<IPost, ToggleLikeArgs, { rejectValue: string }>(
  'posts/like-toggle',
  async function (params: ToggleLikeArgs, { rejectWithValue }) {
    if (localStorage.getItem('token')) {
      const response = await fetch(`https://blog.kata.academy/api/articles/${params[0]}/favorite`, {
        method: params[1] ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        return rejectWithValue('Server Error')
      }
      const favoritedArticle = await response.json()
      const { article } = favoritedArticle
      return article
    }
  }
)

export const fetchPost = createAsyncThunk<IPost, string, { rejectValue: string }>(
  'posts/fetch-post',
  async function (slug: string, { rejectWithValue }) {
    let response
    if (!localStorage.getItem('token')) {
      response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
    } else {
      response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    }

    if (!response.ok) {
      return rejectWithValue('Server Error')
    }
    const data = await response.json()

    const { article } = data
    return article
  }
)

const setLoading = (state: PostsState) => {
  state.status = 'loading'
  state.error = null
}

const AllPostsSlice = createSlice({
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
        state.posts = action.payload && action.payload[1] && action.payload[1]
        state.currentPage = action.payload && action.payload[0]
        state.pagesCount = action.payload && action.payload[2]
        state.status = 'resolved'
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.actualPost = action.payload
      })

      .addCase(fetchPost.pending, setLoading)
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.actualPost = action.payload && formatPost([action.payload])[0]
        state.posts = state.posts.map((post) => {
          if (post.slug === action.payload.slug) post = action.payload
          return post
        })
        state.status = 'resolved'
      })

      .addCase(togglePage.pending, setLoading)

      .addCase(likeToggle.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.posts = state.posts.map((post) => {
            if (post.slug === action.payload.slug) {
              return action.payload
            }
            return post
          })
        }

        state.actualPost = action.payload && formatPost([action.payload])[0]
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.status = 'rejected'
      })
  },
})

export default AllPostsSlice.reducer
