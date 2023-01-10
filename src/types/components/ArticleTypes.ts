export type Props = {
  slug?: string
  props: {
    favoritesCount: number
    slug: string
    date: string
    tagList: (string | null)[]
    username: string
    description: string
    title: string
    body: string
    image: string
  }
}
