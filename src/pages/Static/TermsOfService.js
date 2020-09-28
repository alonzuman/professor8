import { Typography } from '@material-ui/core'
import React from 'react'
import heb from '../../utils/translation/heb'

const TermsOfService = () => {
  return (
    <div className='full__height text__right'>
      <Typography variant='h1'>{heb.TOS}</Typography>
      <Typography variant='body1'>
        {heb.TOS1}
      </Typography>
    </div>
  )
}

export default TermsOfService
