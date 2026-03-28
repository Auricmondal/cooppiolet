export interface Navbar {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  logo: {
    id: number
    documentId: string
    name: string
    alternativeText: string
    caption: string | null
    focalPoint: string | null
    width: number
    height: number
    formats: string | null
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  company_email: string
  legal_links: {
    id: number
    label: string
    href: string
  }[]
  Links: {
    id: number
    label: string
    is_cta: boolean
    href: string
    isPrimary: boolean
  }[]
  localizations: any[]
}
