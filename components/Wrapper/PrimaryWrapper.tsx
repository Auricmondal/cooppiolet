import React from 'react'

const PrimaryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`my-16 max-w-500 px-[1rem] md:px-[2rem] lg:px-[4rem] [@media(min-width:2000px)]:mx-auto`}
    >
      {children}
    </div>
  )
}

export default PrimaryWrapper
