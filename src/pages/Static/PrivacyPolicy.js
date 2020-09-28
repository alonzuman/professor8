import { Typography } from '@material-ui/core'
import React from 'react'
import heb from '../../utils/translation/heb'

const PrivacyPolicy = () => {
  return (
    <div className='text__right'>
      <Typography variant='h1'>{heb.PP}</Typography>
    </div>
  )
}

export default PrivacyPolicy
