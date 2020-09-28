import { Typography } from '@material-ui/core'
import React from 'react'
import NoResultsFound from '../../../assets/svgs/NoResultsFound'

const NoResults = ({ msg }) => {
  return (
    <div className='rtl p-2'>
      <Typography variant='body1'>{msg}</Typography>
      <NoResultsFound className='m__center mt-2 mw-248'/>
    </div>
  )
}

export default NoResults
