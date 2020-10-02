import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import Rating from '../../../components/general/Rating'
import heb from '../../../utils/translation/heb'

const AverageRating = ({ loading, averageRating, reviewsCount }) => {
  if (loading) {
    return (
      <div className='page__section rtl'>
        <Skeleton width={104} height={24} />
        <Skeleton width={48} height={68} />
      </div>
    )
  } else if (!loading && averageRating !== 0 && reviewsCount !== 0) {
    return (
      <div className='page__section flex flex__column align__baseline'>
        {!loading && reviewsCount && <Typography className='text__right rtl' variant='subtitle1'>{`${heb.overallRatingBasedOn} ${reviewsCount} ${heb.reviews}`}</Typography>}
        <Rating big={true} rating={averageRating} loading={loading} icon='star' />
      </div>
    )
  } else {
    return <div />
  }
}

export default AverageRating
