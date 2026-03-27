export interface NewsletterContent {
  id: number
  documentId: string
  title: string
  sub_heading: string
  button_label: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  banner: {
    id: number
    documentId: string
    name: string
    alternativeText: string
    caption: string | null
    focalPoint: string | null
    width: number
    height: number
    url: string
    formats: {
      large: {
        ext: string
        url: string
        width: number
        height: number
      }
      medium: {
        ext: string
        url: string
        width: number
        height: number
      }
      small: {
        ext: string
        url: string
        width: number
        height: number
      }
      thumbnail: {
        ext: string
        url: string
        width: number
        height: number
      }
    }
  }
}
