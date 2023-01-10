import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IPost } from '../models/IPost'
import { PostToCreate } from '../types/components/CreateArticleTypes'
import formatPost from '../services/formatPost'
import { OwnPostsState } from '../types/slices/ownPostsTypes'

import { togglePage } from './allPostsSlice'

const initialState: OwnPostsState = {
  updated: false,
  myposts: [],
  loading: false,
  status: null,
  error: null,
  message: '',
}

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

export const create = createAsyncThunk<IPost, PostToCreate, { rejectValue: string }>(
  'articles/create=article',
  async function (data, { rejectWithValue }) {
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data[0]}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data[1]),
    })

    if (!response.ok) {
      return rejectWithValue('Error in article creation')
    }
    const resp = await response.json()

    return resp
  }
)

export const updatePost = createAsyncThunk<IPost, PostToCreate, { rejectValue: string }>(
  'articles/update-article',
  async function (data, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${data[0]}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data[1]),
    })

    if (!response.ok) {
      return rejectWithValue('Error in article update')
    }
    const resp = await response.json()

    return resp.article
  }
)

export const deletePost = createAsyncThunk<void, string, { rejectValue: string }>(
  'articles/delete-article',
  async function (slug, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      return rejectWithValue('Error in article update')
    }
    const resp = await response.json()
  }
)

const setLoading = (state: OwnPostsState) => {
  state.loading = true
  state.error = null
}

const ownPostSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeStatus(state) {
      state.status = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, setLoading)
      .addCase(create.fulfilled, (state, action) => {
        state.myposts = [...state.myposts, action.payload]
        state.status = 'created'
        state.loading = false
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.updated = true
        state.loading = false
      })
      .addCase(updatePost.pending, setLoading)
      .addCase(togglePage.fulfilled, (state, action) => {
        state.myposts = action.payload && action.payload[1] && action.payload[1]
        state.updated = false
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.status = 'rejected'
      })
  },
})
export const { changeStatus } = ownPostSlice.actions
export default ownPostSlice.reducer
