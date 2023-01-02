import { Link, Route } from 'react-router-dom'

import PostPage from '../PostPage/PostPage'
import ava from '../../assets/avatar.png'

import classes from './Article.module.scss'

type Props = {
  slug?: string
  props: {
    slug: string
    date: string
    cutFirstTag: string | null
    secondTag: string | null
    username: string
    description: string
    title: string
    body: string
    image: string
  }
}

const Article: React.FC<Props> = (props, addit) => {
  const { slug, date, cutFirstTag, secondTag, username, description, title, body, image } = props.props

  return (
    <div className={classes.article}>
      <Route path={`/articles/${slug}`} exact render={() => <PostPage slug={slug} />} />
      <div className={classes.article__about}>
        <div className={classes.article__info}>
          <div className={classes.article__top}>
            <Link to={`/articles/${slug}`} className={classes.article__title}>
              {title}
            </Link>

            <span className={classes.article__likes}>&#9825; 12 </span>
          </div>
          <div className={classes.article__tags}>
            {cutFirstTag && <span className={classes['article__main-tag']}>{cutFirstTag}</span>}
            {secondTag && <span className={classes.article__tag}>{secondTag}</span>}
          </div>
        </div>
        <div className={classes.article__data}>
          <div className={classes.article__created}>
            <span className={classes.article__author}>{username}</span>
            <span className={classes.article__date}>{date}</span>
          </div>
          <div className={classes['article__author-avatar']}>
            {<img src={image || ava} alt="ava" className={classes.article__avatar} />}
          </div>
        </div>
      </div>
      <div className={classes.article__content}>{description.substring(0, 30)}</div>
    </div>
  )
}
export default Article
