import { Typography } from '@material-ui/core'
import React from 'react'
import heb from '../../../utils/translation/heb'
import './HowItWorks.css'

const HowItWorks = () => {
  return (
    <div className='how_it_works__container'>
      <Typography variant='h3'>{heb.howItWorks}?</Typography>
    </div>
  )
}

export default HowItWorks
