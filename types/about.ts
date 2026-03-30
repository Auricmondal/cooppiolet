import { ImageData } from './home'
import { Node } from './strapiRichText'

export interface AboutHero {
  id: number
  Title: string
  primary_btn: string
  secondary_btn: string
  artifact_percentage: string
  artifact_text: string
  banner_text_1: string
  banner_text_2: string
  images: ImageData[]
}

export type AboutCoopgo = Node[]

export interface AboutCooppiolet {
  id: number
  title: string
  bg_image: ImageData
  about_details: Node[]
}

export interface StandCard {
  id: number
  title: string
  description: Node[]
  image: ImageData
}

export interface OurStand {
  id: number
  title: string
  description: string
  card: StandCard[]
}

export interface OverviewCard {
  id: number
  count: string
  title: string
  description: string
}

export interface Overview {
  id: number
  title: string
  description: string
  badges: ImageData[]
  card: OverviewCard[]
}

export interface Quote {
  id: number
  quote: string
  tag: string
}

export interface AboutData {
  id: number
  documentId: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string

  Hero: AboutHero
  about_coopgo: AboutCoopgo
  about_cooppiolet: AboutCooppiolet
  our_stand: OurStand
  overview: Overview
  quote: Quote
}

export interface AboutResponse {
  data: AboutData
  meta: Record<string, unknown>
}
