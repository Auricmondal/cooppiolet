'use client'

import React from 'react'
import LegalContent from '@/components/global/LegalContent'
import { useQuery } from '@tanstack/react-query'
import PrimaryWrapper from '@/components/Wrapper/PrimaryWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'

const TermClient = ({ initialData }: { initialData: any }) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['term'],
    initialData,
    queryFn: async () => {
      const res = await axios.get(`/api/term`)
      return res
    },
    staleTime: Infinity, // Prevents unnecessary background refetches for static content
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
        Failed to sync Terms and Conditions: {error?.message || 'Unknown error occurred'}
      </div>
    )
  }

  const term = data?.data?.Legal
  if (!term) {
    return <div className="py-24 text-center">No terms and conditions content available.</div>
  }

  // 5. Render standard UI effortlessly
  return (
    <LegalContent
      effective_date={term.effective_date}
      id={term.id}
      legal_info={term.legal_info}
      title={term.title}
    />
  )
}

export default TermClient
