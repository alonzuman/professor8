import { Typography } from '@material-ui/core'
import React from 'react'
import NoResultsFound from '../../../assets/svgs/NoResultsFound'

const NoResults = ({ msg, centered = false }) => {
  const style = {
    margin: centered ? '0 auto' : ''
  }

  return (
    <div style={style} className='rtl p-2'>
      <Typography variant='body1'>{msg}</Typography>
      <NoResultsFound className='m__center mt-2 mw-248'/>
    </div>
  )
}

export default NoResults
