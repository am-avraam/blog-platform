export type Response = {
  user: {
    email: string
    token: string
    username: string
    bio: string
    image: string
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

export type PostDataToUpdate = [
  string | undefined,
  {
    user: {
      email?: string
      password?: string
      username?: string
      image?: string
    }
  }
]

export type UserState = {
  user: null | Response
  isLoged: boolean
  status: string | null
  error: string | null
  message: string
}
