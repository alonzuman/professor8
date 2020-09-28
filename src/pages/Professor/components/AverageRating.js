import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import Rating from '../../../components/general/Rating'
import heb from '../../../utils/translation/heb'

const AverageRating = ({ loading, averageRating }) => {
  const fixAverage = () => {
    if (averageRating && averageRating === 0) {
      return ``;
    } else if (averageRating % 1 === 0) {
      return `${averageRating}/5`
    } else {
      return `${averageRating?.toFixed(2)}/5`
    }
  }

  return (
    <div className='page__section flex flex__column align__baseline'>
      <Typography className='text__right rtl' variant='subtitle1'>{loading ? <Skeleton width={104} /> : averageRating !== 0 ? heb.overallRating : ''}</Typography>
      <Rating big={true} rating={fixAverage()} loading={loading} icon='star' />
    </div>
  )
}

export default AverageRating
