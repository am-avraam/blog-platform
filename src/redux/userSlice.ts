/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Response = {
  user: {
    email: 'string'
    token: 'string'
    username: 'string'
    bio: 'string'
    image: 'string'
  }
}

export interface PostDataToCreate {
  user: {
    username: string
    email: string
    password: string
  }
}

export interface PostDataToLogIn {
  user: {
    email: string
    password: string
  }
}

export interface PostDataToUpdate {
  user: {
    email?: string
    password?: string
    username?: string
    image?: string
  }
}

export type UserState = {
  user: null | Response
  isLoged: boolean
  status: string | null
  error: string | null
}

const initialState: UserState = {
  user: null,
  isLoged: false,
  status: null,
  error: null,
}

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

function loged(state: UserState, action: AnyAction) {
  state.status = 'resolved'
  state.isLoged = true
  state.user = action.payload && action.payload
  state.error = null
}

export const rememberLogIn = createAsyncThunk('user/remind-login', async function (_, { rejectWithValue }) {
  const token = localStorage.getItem('token')
  if (!token) return

  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return rejectWithValue('Cannot remember')
    // throw new Error('Cannot remember')
  }
  const resp = await response.json()

  return resp
})

export const logIn = createAsyncThunk<Response, PostDataToLogIn, { rejectValue: string }>(
  'user/sign-in',
  async function (data, { rejectWithValue }) {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return rejectWithValue('Authorization Error')
      // if (error instanceof Error) throw new Error('Authorization Error')
    }
    const resp = await response.json()

    if (!localStorage.getItem('token')) localStorage.setItem('token', resp.user.token)

    return resp as Response
  }
)

export const createUser = createAsyncThunk<Response, PostDataToCreate, { rejectValue: string }>(
  'user/sign-up',
  async function (data, { rejectWithValue }) {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // throw new Error('Try another authentication data')
      return rejectWithValue('Try another authentication data')
    }
    const resp = await response.json()

    localStorage.setItem('token', resp.user.token)

    return resp
  }
)

export const updateUser = createAsyncThunk<Response, PostDataToUpdate, { rejectValue: string }>(
  'user/update-user',
  async function (data: PostDataToUpdate, { rejectWithValue }) {
    console.log(data)

    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) return rejectWithValue('Could not update your data')

    const resp = await response.json()
    console.log(resp)

    return resp
  }
)

const setLoading = (state: UserState) => {
  state.status = 'loading'
  state.error = null
}

const userSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token')
      state.user = null
      state.isLoged = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, setLoading)
      .addCase(createUser.fulfilled, loged)

      .addCase(logIn.fulfilled, loged)
      .addCase(logIn.pending, setLoading)

      .addCase(rememberLogIn.pending, setLoading)
      .addCase(rememberLogIn.fulfilled, loged)

      .addCase(updateUser.fulfilled, loged)
      .addCase(updateUser.pending, setLoading)

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.status = 'rejected'
      })
  },
})

export const { logOut } = userSlice.actions

export default userSlice.reducer
