import { Link, Route } from 'react-router-dom'
import { Button } from 'antd'
import staticMethods from 'antd/es/message'

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
  const username = useAppSelector((state) => state.user.user?.user.username)

  if (status === 'resolved') {
    const aimPost = posts.find((post) => post.slug === slug.slug)
    const { body, title, tagList, author, date, description } = aimPost as IPost
    const isOwnArticle = author.username === username
    console.log(isOwnArticle)

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
              {/* <div>Hey guys</div> */}
              {/* style={{ position: 'absolute' }} */}
              {/* <Button type="primary" danger ghost>
                Delete
              </Button>
              <Button style={{ color: '#52C41A', border: '1px solid #52C41A', borderRadius: 5 }}>Edit</Button> */}

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
              <>
                <Button type="primary" danger ghost style={{ marginLeft: 71, marginRight: 12, width: 78 }}>
                  Delete
                </Button>
                <Button style={{ color: '#52C41A', border: '1px solid #52C41A', borderRadius: 5, width: 65 }}>
                  Edit
                </Button>
              </>
            )}
          </div>
          <div className={classes.article__body}>{body}</div>
        </div>
      </div>
    )
  }
  if (status === 'loading') return <Loading />
  return <Error />
}
export default PostPage
