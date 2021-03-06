import { Typography } from '@material-ui/core'
import React from 'react'
import NoReviewsFound from '../../assets/svgs/NoReviewsFound'
import heb from '../../utils/translation/heb'

const NoReviews = ({ handleClick }) => {
  return (
    <div className='rtl p-2 full__width text__center'>
      <Typography className='mb-4' variant='h3'>
        {heb.noReviewsFound},
        <br/>
        {heb.beTheFirst} <span onClick={handleClick} className='primary text__underline pointer'>{heb.toAdd}</span>
      </Typography>
      <NoReviewsFound className='m__center mt-2 mw-248' />
    </div>
  )
}

export default NoReviews
