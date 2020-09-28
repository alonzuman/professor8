import { Typography } from '@material-ui/core'
import React from 'react'
import heb from '../../utils/translation/heb'

const AboutUs = () => {
  return (
    <div className='text__right'>
      <Typography variant='h1'>{heb.aboutUs}</Typography>
    </div>
  )
}

export default AboutUs
