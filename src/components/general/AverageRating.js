import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import heb from '../../utils/translation/heb'

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

  const ratingStyle = {
    textAlign: 'right'
  }

  return (
    <div className='page__section'>
      <Typography variant='subtitle1'>{loading ? <Skeleton width={104} /> : averageRating !== 0 ? heb.overallRating : ''}</Typography>
      <Typography style={ratingStyle} dir='ltr' variant='h3'>{loading ? <Skeleton width={80} /> : averageRating ? fixAverage() : ''}</Typography>
    </div>
  )
}

export default AverageRating
