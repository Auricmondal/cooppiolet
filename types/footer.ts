import { ImageData } from './home'

export interface FooterLink {
  id: number
  label: string
  href: string
  is_cta: boolean
  isPrimary: boolean
}

export interface SocialLink {
  id: number
  platform?: string
  url?: string
  icon?: ImageData
}

/* ------------------ Footer ------------------ */

export interface Footer {
  id: number
  header: string
  rights: string
  system_status: string

  logo: ImageData
  footer_logo: ImageData

  Links: FooterLink[]
  social_links: SocialLink[]
}

/* ------------------ Root Response ------------------ */

export interface FooterResponse {
  id: number
  documentId: string
  Footer: Footer
}
