export type PostToCreate = [
  string | undefined,
  {
    article: {
      title?: string
      description?: string
      body?: string
      tagList?: string[]
    }
  }
]

export type ArticleInputValues = {
  title: string
  description: string
  text: string
  tagList: string[]
}

export type Props = {
  slug: string
}
