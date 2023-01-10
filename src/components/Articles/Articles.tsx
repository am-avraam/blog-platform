/* eslint-disable indent */
import { useSelector } from 'react-redux'
import uniqid from 'uniqid'
import { format } from 'date-fns'

import Article from '../Article/Article'
import Loading from '../Loading/Loading'
import Pagination from '../Pagination/Pagination'
import Error from '../Alert/Alert'
import { IPost } from '../../models/IPost'
import { State } from '../../models/stateTypes'

import a from './Articles.module.scss'

const Articles: React.FC = () => {
  const { posts, status: postsStatus, error: postsError } = useSelector((state: State) => state.posts)

  if (postsStatus === 'loading') return <Loading />
  if (postsError === 'Server error') return <Error />

  return (
    <div className={a.articles}>
      {posts.map((post: IPost) => {
        const date = format(new Date(post.updatedAt), 'MMMM dd, yyyy')

        const props = {
          favoritesCount: post.favoritesCount,
          slug: post.slug,
          date,
          tagList: post.tagList,
          username: post.author.username,
          image: post.author.image,
          description: post.description,
          title: post.title,
          body: post.body,
        }
        return <Article key={uniqid()} props={props} slug={post.slug} />
      })}
      <Pagination />
    </div>
  )
}
export default Articles
