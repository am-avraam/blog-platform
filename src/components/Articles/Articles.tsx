/* eslint-disable indent */
import { useSelector } from 'react-redux'
import uniqid from 'uniqid'
import { Link, Route } from 'react-router-dom'
import { format } from 'date-fns'

import Article from '../Article/Article'
import Loading from '../Loading/Loading'
import Pages from '../Pages/Pages'
import classes from '../Article/Article.module.scss'
import { PostsState } from '../../redux/allPostsSlice'
import Error from '../Alert/Alert'
import { IPost } from '../../models/IPost'
import { State } from '../../models/stateTypes'

import a from './Articles.module.scss'

const Articles: React.FC = () => {
  const { posts, status: postsStatus, error: postsError } = useSelector((state: State) => state.posts)
  const { error: userError } = useSelector((state: State) => state.user)

  if (postsStatus === 'loading') return <Loading />
  if (postsError === 'Server error') return <Error />

  return (
    <div className={a.articles}>
      {posts.map((post: IPost) => {
        const date = format(new Date(post.updatedAt), 'MMMM dd, yyyy')

        const cutFirstTag = post.tagList[0]
        // ? post.tagList[0].slice(0, post.tagList[0].indexOf(' ', 10)).replace(/\.$|,$|;$/, '')
        // : null
        const secondTag = post.tagList[1]
        // || null

        const props = {
          slug: post.slug,
          date,
          cutFirstTag,
          secondTag,
          username: post.author.username,
          image: post.author.image,
          description: post.description,
          title: post.title,
          body: post.body,
        }
        return (
          <Article key={uniqid()} props={props} />

          // <div className={classes.article} key={uniqid()}>
          //   <Route path={`/articles/${post.slug}`} exact render={() => <Article props={props} />} />
          //   <div className={classes.article__about}>
          //     <div className={classes.article__info}>
          //       <div className={classes.article__top}>
          //         <Link to={`/articles/${post.slug}`} className={classes.article__title}>
          //           {post.title.trim()}
          //         </Link>

          //         <span className={classes.article__likes}>&#9825; 12 </span>
          //       </div>
          //       <div className={classes.article__tags}>
          //         {cutFirstTag && <span className={classes['article__main-tag']}>{cutFirstTag}</span>}
          //         {secondTag && <span className={classes.article__tag}>{post.tagList[1]}</span>}
          //       </div>
          //     </div>
          //     <div className={classes.article__data}>
          //       <div className={classes.article__created}>
          //         <span className={classes.article__author}>{post.author.username}</span>
          //         <span className={classes.article__date}>{date}</span>
          //       </div>
          //       <div className={classes['article__author-avatar']}> </div>
          //     </div>
          //   </div>
          //   <div className={classes.article__content}>{post.description.substring(0, 30)}</div>
          // </div>
        )
      })}

      {/* <Article /> */}
      <Pages />
    </div>
  )
}
export default Articles
