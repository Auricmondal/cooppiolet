export interface CookieClientProps {
  content?: {
    title: string
    description: string
    accept_btn_label: string
    reject_btn_label: string
    links: {
      id: number
      label: string
      is_cta: boolean
      href: string
      isPrimary: boolean
    }[]
  }
}
