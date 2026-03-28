'use client'

import React from 'react'
import LegalContent from '@/components/global/LegalContent'
import { useQuery } from '@tanstack/react-query'
import PrimaryWrapper from '@/components/Wrapper/PrimaryWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'

const PrivacyClient = ({ initialData }: { initialData: any }) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['privacy-policy'],
    initialData,
    queryFn: async () => {
      const res = await axios.get(`api/privacy`)
      return res
    },
    staleTime: Infinity,
  })

  if (isLoading) {
    return (
      <PrimaryWrapper>
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 py-12">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="mb-12 h-4 w-1/4" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </PrimaryWrapper>
    )
  }

  // 4. Handle unexpected errors (though initialData normally prevents this)
  if (isError) {
    return (
      <div className="py-24 text-center text-red-500">
        Failed to sync Privacy Policy: {error?.message || 'Unknown error occurred'}
      </div>
    )
  }

  const privacy = data?.data?.Legal
  if (!privacy) {
    return <div className="py-24 text-center">No privacy policy content available.</div>
  }

  // 5. Render standard UI effortlessly
  return (
    <LegalContent
      effective_date={privacy.effective_date}
      id={privacy.id}
      legal_info={privacy.legal_info}
      title={privacy.title}
    />
  )
}

export default PrivacyClient
