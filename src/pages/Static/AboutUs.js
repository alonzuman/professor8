import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import useScrollPosition from '../../hooks/useScrollPosition'
import heb from '../../utils/translation/heb'

const AboutUs = () => {
  const { scrollToTop } = useScrollPosition()

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <div className='full__height p-2 text__right m__center mw-768'>
      <Typography variant='h1'>{heb.aboutUs}</Typography>
    </div>
  )
}

export default AboutUs
