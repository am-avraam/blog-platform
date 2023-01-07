import { Link, Route } from 'react-router-dom'
import uniqid from 'uniqid'

import PostPage from '../PostPage/PostPage'
import ava from '../../assets/avatar.png'
import { likeToggle } from '../../redux/allPostsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import like from '../../assets/like.svg'
import activelike from '../../assets/activelike.png'

import classes from './Article.module.scss'

type Props = {
  slug?: string
  props: {
    favoritesCount: number
    slug: string
    date: string
    tagList: (string | null)[]
    username: string
    description: string
    title: string
    body: string
    image: string
  }
}

const Article: React.FC<Props> = (props) => {
  const { slug, date, username, description, title, image, tagList, favoritesCount } = props.props
  const dispatch = useAppDispatch()
  const thisPost = useAppSelector((state) => state.posts.posts).find((post) => post.slug === slug)
  const { isLoged } = useAppSelector((state) => state.user)
  const isFavorited = thisPost?.favorited

  return (
    <div className={classes.article}>
      <Route path={`/articles/${slug}`} exact render={() => <PostPage slug={slug} />} />
      <div className={classes.article__about}>
        <div className={classes.article__info}>
          <div className={classes.article__top}>
            <Link to={`/articles/${slug}`} className={classes.article__title}>
              {title}
            </Link>

            <button onClick={() => dispatch(likeToggle([slug, isFavorited]))} className={classes.article__likes}>
              <img src={isFavorited && isLoged ? activelike : like} alt="like" />
              {favoritesCount}
            </button>
          </div>
          <div className={classes.article__tags}>
            {tagList[0] && <span className={classes['article__main-tag']}>{tagList[0]}</span>}
            {tagList.length > 1 &&
              tagList
                .slice(1)
                .filter((tag) => tag)
                .map((tag) => (
                  <span key={uniqid()} className={classes.article__tag}>
                    {tag}
                  </span>
                ))}
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
      <div className={classes.article__content}>{description.substring(0, 150)}</div>
    </div>
  )
}
export default Article
