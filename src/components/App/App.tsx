import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import { fetchPosts, togglePage } from '../../redux/firtsSlice'
import '../../styles'
import Header from '../Header/Header'
import Articles from '../Articles/Articles'
import Article from '../Article/Article'
import PostPage from '../PostPage/PostPage'
import LogForm from '../Authentication/SignUp/LogForm'

import classes from './App.module.scss'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(togglePage(1))
  }, [dispatch])

  return (
    <div className={classes.app}>
      <Router>
        <Header />
        <Switch>
          <Route path="/articles" exact component={Articles} />
          <Route
            path="/articles/:slug"
            exact
            render={({ match, location, history }) => {
              const { slug } = match.params
              return <PostPage slug={slug} />
            }}
          />
          <Route path="/sign-up" exact component={LogForm} />
        </Switch>
        {/* <Articles /> */}
      </Router>
    </div>
  )
}

export default App
