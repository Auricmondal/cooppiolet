import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { H4 } from '../Typography'
import { X } from 'lucide-react'
import { ModalType } from '@/context/ModalContext'

interface ModalImage {
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

interface ModalProps {
  type: ModalType
  isBlocking?: boolean
  position?: 'center' | 'bottom-right'
  Image?: ModalImage
  header: {
    title: string
    description?: string
    close?: boolean
    closeAction?: () => void
    className?: string
  }
  children?: React.ReactNode
  footer: {
    primaryBtn: {
      label: string
      onClick: () => void
    }
    secondaryBtn?: {
      label: string
      onClick: () => void
    }
  }
}

const Modal = ({
  type,
  isBlocking = true,
  position = 'center',
  Image: ModalImage,
  header,
  children,
  footer: { primaryBtn, secondaryBtn },
}: ModalProps) => {
  // Position Logic
  const positionClasses = {
    center: 'fixed inset-0 flex items-center justify-center p-6',
    'bottom-right': 'fixed right-10 bottom-10 max-md:right-5 max-md:bottom-5 p-0',
  }

  return (
    <div
      className={`z-[100] ${positionClasses[position]} ${!isBlocking ? 'pointer-events-none' : ''}`}
    >
      {/* 1. Background Overlay (Only if isBlocking is true) */}
      {isBlocking && <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />}

      {/* 2. Modal Content */}
      <div
        className={`bg-cst-neutral-01/20 pointer-events-auto relative w-full max-w-[440px] rounded-[32px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all`}
      >
        {ModalImage?.url && (
          <div className="mb-4 overflow-hidden rounded-xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${ModalImage?.url}`}
              alt={ModalImage.alternativeText || 'Modal Image'}
              width={100}
              height={100}
              className="w-full object-cover lg:h-full"
            />
          </div>
        )}
        {header.close && (
          <Button
            variant="ghost"
            size="icon"
            onClick={header.closeAction}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/10 hover:text-white"
          >
            <X size={24} />
          </Button>
        )}

        <div className="p-8">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <H4 className={`${header.className} text-lg font-semibold tracking-tight text-black`}>
                {header.title}
              </H4>
              {header.description && (
                <p className="mt-1 text-[14px] leading-snug text-black/60">{header.description}</p>
              )}
            </div>
          </div>

          <div>{children}</div>

          {/* Footer */}
          <div className="mt-6 flex gap-3">
            {secondaryBtn && (
              <Button variant="outline" className="flex-1" onClick={secondaryBtn.onClick}>
                {secondaryBtn.label}
              </Button>
            )}
            <Button variant="primary" className="flex-1" onClick={primaryBtn.onClick}>
              {primaryBtn.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
