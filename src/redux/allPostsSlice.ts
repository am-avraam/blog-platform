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

export type FavoriteResponse = {
  article: IPost
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

    return [num, data]
  }
)

export const likeToggle = createAsyncThunk<IPost, string, { rejectValue: string }>(
  'posts/like-toggle',
  async function (slug: string, { rejectWithValue }) {
    const fetchAimPost = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const respWithPost = await fetchAimPost.json()
    const isFavoritedAimPost = respWithPost.article.favorited
    console.log(isFavoritedAimPost)

    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
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
)

export const fetchPost = createAsyncThunk<IPost, string, { rejectValue: string }>(
  'posts/fetch-post',
  async function (slug: string, { rejectWithValue }) {
    const fetchAimPost = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const response = await fetchAimPost.json()

    if (!response.ok) {
      return rejectWithValue('Server Error')
    }

    return response.article
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
        state.status = 'resolved'
        state.posts = action.payload && action.payload[1] && formatPost(action.payload[1].articles)
        state.currentPage = action.payload && action.payload[0]
        state.pagesCount = action.payload && action.payload[1].articlesCount
      })

      .addCase(togglePage.pending, setLoading)

      .addCase(likeToggle.fulfilled, (state, action) => {
        console.log(action.payload)

        state.posts = state.posts.map((post) => {
          if (post.slug === action.payload.slug) {
            return action.payload
          }
          return post
        })
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.status = 'rejected'
      })
  },
})

// export const { one, } = postsSlice.actions

export default AllPostsSlice.reducer
