import { Link, Route } from 'react-router-dom'

import classes from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <span className={classes.header__title}>Realworld Blog</span>
      <div className={classes.header__buttons}>
        <Link className={classes.header__button} to={'/sign-up'}>
          Sign In
        </Link>
        <Link className={classes.header__button} to={'/sign-up'}>
          Sign Up
        </Link>
        {/* <button className={classes.header__button}>Sign In</button>
        <button className={classes.header__button}>Sign Up</button> */}
      </div>
    </header>
  )
}
export default Header
