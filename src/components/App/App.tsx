import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import { togglePage } from '../../redux/allPostsSlice'
import '../../styles'
import Header from '../Header/Header'
import Articles from '../Articles/Articles'
import PostPage from '../PostPage/PostPage'
import SignUp from '../Authentication/SignUp/SignUp'
import SignIn from '../Authentication/SignIn/SignIn'
import { rememberLogIn } from '../../redux/userSlice'
import EditProfile from '../Authentication/EditProfile/EditProfile'
import CreateArticle from '../PostArticle/CreateArticle/CreateArticle'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(togglePage(1))
    dispatch(rememberLogIn())
  }, [dispatch])

  return (
    <div>
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
          <Route
            path="/articles/:slug/edit"
            exact
            render={({ match, location, history }) => {
              const { slug } = match.params
              return <CreateArticle slug={slug} />
            }}
          />

          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/profile" exact component={EditProfile} />
          <Route path="/new-article" exact component={CreateArticle} />
          <Redirect to="/articles" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
