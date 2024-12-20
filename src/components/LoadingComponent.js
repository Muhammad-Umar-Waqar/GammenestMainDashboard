import React from 'react'

function LoadingComponent() {
  return (
    <div className="h-screen w-screen">
      <div className="bg-white grid place-items-center h-full">
        <div className="animate-spin inline-block size-[60px] sm:size-20 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingComponent
