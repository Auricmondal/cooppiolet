import { Node } from './strapiRichText'

export type Legal = {
  id: number
  title: string
  effective_date: string
  legal_info: Node[]
}
