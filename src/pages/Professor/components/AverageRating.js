import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import Rating from '../../../components/general/Rating'
import heb from '../../../utils/translation/heb'

const AverageRating = ({ loading, averageRating }) => {
  return (
    <div className='page__section flex flex__column align__baseline'>
      <Typography className='text__right rtl' variant='subtitle1'>{!averageRating ? <Skeleton width={104} /> : averageRating !== 0 ? heb.overallRating : ''}</Typography>
      <Rating big={true} rating={averageRating} loading={loading} icon='star' />
    </div>
  )
}

export default AverageRating
