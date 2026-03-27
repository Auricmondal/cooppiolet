export type TextNode = {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
}

export type LinkNode = {
  type: 'link'
  url: string
  children: Node[]
}

export type ParagraphNode = {
  type: 'paragraph'
  children: Node[]
}

export type HeadingNode = {
  type: 'heading'
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: Node[]
}

export type ListNode = {
  type: 'list'
  format: 'ordered' | 'unordered'
  children: ListItemNode[]
}

export type ListItemNode = {
  type: 'list-item'
  children: Node[]
}

export type QuoteNode = {
  type: 'quote'
  children: Node[]
}

export type CodeNode = {
  type: 'code'
  children: TextNode[]
}

export type ImageNode = {
  type: 'image'
  image: {
    url: string
    alternativeText?: string
    caption?: string
  }
}

export type Node =
  | TextNode
  | LinkNode
  | ParagraphNode
  | HeadingNode
  | ListNode
  | ListItemNode
  | QuoteNode
  | CodeNode
  | ImageNode
