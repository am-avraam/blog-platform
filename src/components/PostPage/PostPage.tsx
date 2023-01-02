import { Link, Route } from 'react-router-dom'

import { useAppSelector } from '../../hooks/redux'
import { IPost } from '../../models/IPost'
import Loading from '../Loading/Loading'
import Error from '../Alert/Alert'
import ava from '../../assets/avatar.png'

import classes from './PostPage.module.scss'

type Props = {
  slug: string
}

const PostPage: React.FC<Props> = (slug) => {
  const { posts, status } = useAppSelector((state) => state.posts)
  if (status === 'resolved') {
    const aimPost = posts.find((post) => post.slug === slug.slug)
    const { body, title, tagList, author, date, description } = aimPost as IPost

    return (
      <div className={classes.wrapper}>
        <div className={classes.article}>
          <div className={classes.article__about}>
            <div className={classes.article__info}>
              <div className={classes.article__top}>
                <Link to={'/articles/'} className={classes.article__title}>
                  {title}
                </Link>

                <span className={classes.article__likes}>&#9825; 12 </span>
              </div>
              <div className={classes.article__tags}>
                {tagList[0] && <span className={classes['article__main-tag']}>{tagList[0]}</span>}
                {tagList[1] && <span className={classes.article__tag}>{tagList[1]}</span>}
              </div>
            </div>
            <div className={classes.article__data}>
              <div className={classes.article__created}>
                <span className={classes.article__author}>{author.username}</span>
                <span className={classes.article__date}>{date}</span>
              </div>
              <div className={classes['article__author-avatar']}>
                {<img src={author.image || ava} alt="ava" className={classes.article__avatar} />}
              </div>
            </div>
          </div>
          <div className={classes.article__content}>{description.substring(0, 30)}</div>
          <div className={classes.article__body}>{body}</div>
        </div>
      </div>
    )
  }
  if (status === 'loading') return <Loading />
  return <Error />
}
export default PostPage
