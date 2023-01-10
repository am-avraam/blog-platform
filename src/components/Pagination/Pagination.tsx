import { Pagination as Paginate } from 'antd'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../hooks/redux'
import './Pagination.css'
import { togglePage } from '../../redux/allPostsSlice'
import { State } from '../../models/stateTypes'

const Pagination = () => {
  const dispatch = useAppDispatch()
  const { pagesCount, currentPage } = useSelector((state: State) => state.posts)
  return (
    <Paginate
      total={(pagesCount / 5) * 10}
      showSizeChanger={false}
      current={currentPage}
      onChange={(num) => dispatch(togglePage(num))}
    />
  )
}

export default Pagination
