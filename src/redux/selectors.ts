import { StateType } from '../types/slices/stateType'

export const getPostsState = (state: StateType) => {
  return state.posts
}

export const getUser = (state: StateType) => {
  return state.user
}

export const getActualPost = (state: StateType) => {
  return state.posts.actualPost
}

export const getUserName = (state: StateType) => {
  return state.user.user?.user.username
}

export const getArticlesState = (state: StateType) => {
  return state.articles
}

export const getToken = (state: StateType) => {
  return state.user.user?.user.token
}

export const getMyArticlesStatus = (state: StateType) => {
  return state.articles.status
}

export const getAllPostsStatus = (state: StateType) => {
  return state.posts.status
}

export const getAllPosts = (state: StateType) => {
  return state.posts.posts
}

export const getUserState = (state: StateType) => {
  return state.user
}

export const getAuthStatus = (state: StateType) => {
  return state.user.isLoged
}
