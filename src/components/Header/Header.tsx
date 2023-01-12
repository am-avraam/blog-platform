import { Link } from 'react-router-dom'

import { logOut } from '../../redux/userSlice'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import logo from '../../assets/avatar.png'
import { togglePage } from '../../redux/allPostsSlice'
import { getUserState } from '../../redux/selectors'

import classes from './Header.module.scss'

const Header: React.FC = () => {
  const { isLoged, user } = useAppSelector((state) => getUserState(state))
  const dispatch = useAppDispatch()

  return (
    <header className={classes.header}>
      <a className={classes.header__title} href="/articles">
        Realworld Blog
      </a>

      <div className={classes.header__buttons}>
        {!isLoged && (
          <>
            <Link className={classes.header__button} to={'/sign-in'}>
              Sign In
            </Link>
            <Link className={classes.header__button} to={'/sign-up'}>
              Sign Up
            </Link>
          </>
        )}
        {isLoged && (
          <div className={classes['header__logged-buttons']}>
            <Link className={classes['header__logged-button']} to={'/new-article'}>
              Create article
            </Link>
            <Link className={classes['header__logged-button']} to={'/profile'}>
              <p>{user?.user.username}</p>
              <img className={classes['header__logged-avatar']} src={user?.user.image || logo} />
            </Link>
            <button
              className={classes['header__logged-button']}
              onClick={() => {
                dispatch(togglePage(1))
                dispatch(logOut())
              }}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header
