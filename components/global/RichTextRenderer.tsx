import React from 'react'
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  UL,
  OL,
  LI,
  Bold,
  Italic,
  Underline,
  InlineCode,
  Quote,
  CodeBlock,
  Figure,
} from './Typography'
import { Node } from '@/types/strapiRichText'
import Link from 'next/link'

export const StrapiRichTextRenderer = ({ content }: { content: Node[] }) => {
  const renderNode = (node: Node, i: number): React.ReactNode => {
    switch (node.type) {
      case 'paragraph':
        return <P key={i}>{node.children?.map(renderNode)}</P>

      case 'heading':
        const Heading = [H1, H2, H3, H4, H5, H6][node.level - 1]
        return <Heading key={i}>{node.children?.map(renderNode)}</Heading>

      case 'text': {
        let el: React.ReactNode = node.text

        if (node.bold) el = <Bold>{el}</Bold>
        if (node.italic) el = <Italic>{el}</Italic>
        if (node.underline) el = <Underline>{el}</Underline>
        if (node.code) el = <InlineCode>{el}</InlineCode>

        return <React.Fragment key={i}>{el}</React.Fragment>
      }

      case 'link':
        return (
          <Link key={i} href={node.url} className="text-blue-600 underline">
            {node.children?.map(renderNode)}
          </Link>
        )

      case 'list':
        const List = node.format === 'ordered' ? OL : UL
        return <List key={i}>{node.children?.map(renderNode)}</List>

      case 'list-item':
        return <LI key={i}>{node.children?.map(renderNode)}</LI>

      case 'quote':
        return <Quote key={i}>{node.children?.map(renderNode)}</Quote>

      case 'code':
        return <CodeBlock key={i} code={node.children?.map((c: any) => c.text).join('')} />

      case 'image':
        return (
          <Figure
            key={i}
            src={node.image.url}
            alt={node.image.alternativeText}
            caption={node.image.caption}
          />
        )

      default:
        return null
    }
  }

  return <>{content?.map(renderNode)}</>
}
