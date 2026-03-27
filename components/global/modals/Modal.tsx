'use client'
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
        className={`bg-cst-neutral-1/95 pointer-events-auto relative w-full max-w-[440px] rounded-[32px] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all`}
      >
        {ModalImage?.url && (
          <div className="mb-4 overflow-hidden rounded-xl">
            <Image
              src={`http://localhost:1337${ModalImage?.url}`}
              alt={ModalImage.alternativeText || 'Modal Image'}
              width={100}
              height={100}
              className="w-full object-cover lg:h-full"
            />
          </div>
        )}
        {header.close && (
          <X
            size={24}
            onClick={header.closeAction}
            className="hover:text-cst-neutral-05 absolute top-4 right-4 z-50 cursor-pointer text-white transition-colors"
          />
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
          <div className="mt-6 flex gap-2">
            {secondaryBtn && (
              <button
                className="flex-1 rounded-full border border-black/5 bg-white/50 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white"
                onClick={secondaryBtn.onClick}
              >
                {secondaryBtn.label}
              </button>
            )}
            <button
              className="flex-1 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:bg-zinc-800 active:scale-95"
              onClick={primaryBtn.onClick}
            >
              {primaryBtn.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
