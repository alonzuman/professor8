import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import heb from '../../../utils/translation/heb'

const AverageRating = ({ loading, averageRating }) => {
  const fixAverage = () => {
    if (averageRating && averageRating === 0) {
      return ``;
    } else if (averageRating % 1 === 0) {
      return `${averageRating} / 5`
    } else {
      return `${averageRating} / 5`
    }
  }

  return (
    <div className='page__section flex flex__column align__baseline'>
      <Typography className='text__right rtl' variant='subtitle1'>{loading ? <Skeleton width={104} /> : averageRating !== 0 ? heb.overallRating : ''}</Typography>
      <Typography className='text__right ltr mt-1' variant='h3'>{loading ? <Skeleton width={120} height={120} /> : averageRating ? fixAverage() : ''}</Typography>
    </div>
  )
}

export default AverageRating
