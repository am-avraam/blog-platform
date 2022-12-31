import { Pagination } from 'antd'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../hooks/redux'
import './Pages.css'
import { PostsState, togglePage } from '../../redux/firtsSlice'
import { State } from '../../models/stateTypes'

const Pages = () => {
  const dispatch = useAppDispatch()
  const { pagesCount, currentPage } = useSelector((state: State) => state.posts)
  return (
    <Pagination
      total={(pagesCount / 5) * 10}
      showSizeChanger={false}
      current={currentPage}
      onChange={(num) => dispatch(togglePage(num))}
    />
  )
  // onChange={ } current={ } total={ } showSizeChanger={ } hideOnSinglePage={ }
}

export default Pages
