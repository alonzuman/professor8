import React, { useEffect, useState } from 'react'

const PageContainer = ({ children }) => {
  const [height, setHeight] = useState()

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 136)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [window.innerHeight, window.location])

  return (
    <div style={{ minHeight: height }} className='page__container'>
      {children}
    </div>
  )
}

export default PageContainer
