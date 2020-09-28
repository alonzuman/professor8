import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const PageContainer = ({ children }) => {
  const [height, setHeight] = useState()
  const history = useHistory()

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 136)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [window.innerHeight, history.location])

  return (
    <div style={{ minHeight: height }} className='page__container'>
      {children}
    </div>
  )
}

export default PageContainer
