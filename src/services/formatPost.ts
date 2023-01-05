import format from 'date-fns/format'

import { IPost } from '../models/IPost'

const formatPost = (arr: IPost[]): IPost[] => {
  if (Array.isArray(arr))
    return arr.map((el) => {
      const date = format(new Date(el.updatedAt), 'MMMM dd, yyyy')

      const cutTagList = el.tagList.map((tag) => tag?.slice(0, tag.indexOf('', 20)).replace(/\.$|,$|;$/, '') || null)

      return { ...el, tagList: [...cutTagList], date }
    })

  return arr
}

export default formatPost
