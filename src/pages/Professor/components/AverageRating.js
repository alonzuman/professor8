import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import Rating from '../../../components/general/Rating'
import heb from '../../../utils/translation/heb'

const AverageRating = ({ loading, averageRating, reviewsCount }) => {
  return (
    <div className='page__section flex flex__column align__baseline'>
      {loading && <Typography className='text__right rtl' variant='subtitle1'><Skeleton width={104} /></Typography>}
      {!loading && reviewsCount && <Typography className='text__right rtl' variant='subtitle1'>{`${heb.overallRatingBasedOn} ${reviewsCount} ${heb.reviews}`}</Typography>}
      <Rating big={true} rating={averageRating} loading={loading} icon='star' />
    </div>
  )
}

export default AverageRating
