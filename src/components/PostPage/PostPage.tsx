import { Link, Redirect, Route } from 'react-router-dom'
import { Button, message, Popconfirm } from 'antd'
import staticMethods from 'antd/es/message'
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react'
import uniqid from 'uniqid'

import { deletePost } from '../../redux/ownPostSlice'
import { likeToggle, fetchPost, togglePage } from '../../redux/allPostsSlice'
import like from '../../assets/like.svg'
import activelike from '../../assets/activelike.png'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { IPost } from '../../models/IPost'
import Loading from '../Loading/Loading'
import Error from '../Alert/Alert'
import ava from '../../assets/avatar.png'

import classes from './PostPage.module.scss'

type Props = {
  slug: string
}

// const confirm = (slug: string) => {
//   useAppDispatch()(deletePost(slug))
//   message.success('Click on Yes')
// }

const cancel = (e?: React.MouseEvent<HTMLElement>) => {
  message.error('Click on No')
}

const PostPage: React.FC<Props> = (slug) => {
  const dispatch = useAppDispatch()

  const confirm = (slug: string) => {
    dispatch(deletePost(slug))
    dispatch(togglePage(1))
    message.success('Click on Yes')
  }

  useEffect(() => {
    dispatch(fetchPost(slug.slug))
  }, [dispatch])
  const { actualPost, status } = useAppSelector((state) => state.posts)

  const username = useAppSelector((state) => state.user.user?.user.username)

  const isFavorited = actualPost?.favorited
  if (status === 'rejected') return <Redirect to="/articles" />
  if (status === 'resolved' && actualPost && typeof actualPost !== undefined) {
    const { body = '', title, tagList, author, date, description, favoritesCount } = actualPost as IPost
    const isOwnArticle = author.username === username

    return (
      <div className={classes.wrapper}>
        <div className={classes.article}>
          <div className={classes.article__about}>
            <div className={classes.article__info}>
              <div className={classes.article__top}>
                <Link to={'/articles/'} className={classes.article__title}>
                  {title}
                </Link>

                <button
                  onClick={() => dispatch(likeToggle([slug.slug, isFavorited]))}
                  className={classes.article__likes}
                >
                  <img src={isFavorited ? activelike : like} alt="like" />
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
                <span className={classes.article__author}>{author.username}</span>
                <span className={classes.article__date}>{date}</span>
              </div>
              <div className={classes['article__author-avatar']}>
                {<img src={author.image || ava} alt="ava" className={classes.article__avatar} />}
              </div>
            </div>
          </div>
          <div>
            <div className={classes.article__content}>{description.substring(0, 30)}</div>
            {isOwnArticle && (
              <div className={classes.article__buttons}>
                <Button
                  type="primary"
                  className={classes.article__button}
                  danger
                  ghost
                  style={{ marginLeft: 71, marginRight: 12, width: 78 }}
                >
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirm(slug.slug)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                    placement={'right'}
                  >
                    <a style={{ color: 'red' }} href="#">
                      Delete
                    </a>
                  </Popconfirm>
                </Button>
                {/* <Button style={{ color: '#52C41A', border: '1px solid #52C41A', borderRadius: 5, width: 65 }}> */}
                <Link
                  to={`/articles/${slug.slug}/edit`}
                  className={classes.article__button}
                  style={{ color: '#52C41A', border: '1px solid #52C41A', borderRadius: 5, width: 65, height: 31 }}
                >
                  Edit
                </Link>
                {/* </Button> */}
              </div>
            )}
          </div>
          <div className={classes.article__body}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }
  if (status === 'rejected') return <Error />
  return <Loading />
}
export default PostPage
