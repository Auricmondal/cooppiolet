import { Node } from './strapiRichText'

export interface HeroData {
  id: number
  pre_header: string
  show_pre_header: boolean
  title: string
  sub_heading: string
  cta_label: string
  hero_image: {
    url: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
  }
  graphics: {
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    url: string
  }[]

  dashboard: {
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    url: string
    width: number
    height: number
    formats: {
      thumbnail: {
        url: string
        width: number
        height: number
      }
    }
  }
}

export interface PartnersData {
  id: number
  title: string
  partner_images: {
    id: number
    documentId: string
    name: string
    height: number
    width: number
    alternativeText: string | null
    caption: string | null
    url: string
  }[]
}

export interface SolutionsData {
  id: number
  tag_label: string
  title: string
  description: string
  solutions_header: string
  solutions: {
    id: number
    name: string
    is_coming_soon: boolean
    coming_soon_label: string
    icon: {
      id: number
      documentId: string
      name: string
      height: number
      width: number
      alternativeText: string | null
      caption: string | null
      url: string
    }
    solution_image: {
      alternativeText: string | null
      caption: string | null
      createdAt: string
      documentId: string
      ext: string
      focalPoint: null | unknown
      url: string
      height: number
      id: number
      width: number
    }
  }[]
}

export interface ComingSoonItem {
  label: string
  icon: {
    id: number
    documentId: string
    name: string
    height: number
    width: number
    alternativeText: string | null
    caption: string | null
    url: string
  }
}

export interface SecurityItem {
  title: string
  description: string
  is_badge_section: boolean
  badges?: Badge[]
}

export interface Badge {
  id: number
  documentId: string
  name: string
  height: number
  width: number
  alternativeText: string | null
  caption: string | null
  url: string
}

export interface ImageData {
  id: number
  documentId: string
  name: string
  height: number
  width: number
  alternativeText: string | null
  caption: string | null
  url: string
  format?: {
    thumbnail: {
      url: string
      width: number
      height: number
    }
  }
}

export interface ProductFeature {
  id: number
  tag_label: string
  title: string
  description: string
  type: string
  alignment: string
  section_image?: ImageData
  details?: {
    id: number
    title: string
    description: string
  }[]

  others?: {
    title: string

    feature: {
      id: number
      feature_name: string
    }[]
  }[]
  coming_soon?: ComingSoonItem[]

  security?: SecurityItem[]
}

export interface FAQsData {
  id: number
  tag: string
  Faq: {
    Question: string
    Answer: Node[]
  }[]
}

export interface FinalCTAData {
  id: number
  title: string
  sub_heading: string
  cta_label: string
  secondary_cta: string
}

export interface HomeData {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  hero: HeroData
  partners: PartnersData
  solutions: SolutionsData
  product: ProductFeature[]
  faqs: FAQsData
  final_cta: FinalCTAData
}

export interface HomeResponse {
  data: HomeData
  meta: Record<string, unknown>
}
