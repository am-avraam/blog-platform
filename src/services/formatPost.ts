import format from 'date-fns/format'

import { IPost } from '../models/IPost'

const formatPost = (arr: IPost[]): IPost[] => {
  if (Array.isArray(arr))
    return arr.map((el) => {
      const date = format(new Date(el.updatedAt), 'MMMM dd, yyyy')

      const cutFirstTag = el.tagList[0]
        ? el.tagList[0].slice(0, el.tagList[0].indexOf(' ', 10)).replace(/\.$|,$|;$/, '')
        : null
      const secondTag = el.tagList[1] || null

      return { ...el, tagList: [cutFirstTag, secondTag], date }
    })

  return arr
}

export default formatPost
