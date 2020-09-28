import { Typography } from '@material-ui/core'
import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Skeleton } from '@material-ui/lab';

const Rating = ({ rating, loading }) => {
  return (
    <>
      {loading && !rating && <Skeleton height={60} width={60} />}
      {!loading && rating &&
      <div className='flex align__center'>
        <FavoriteIcon style={{ color: 'red', height: 16, width: 16, marginLeft: 4 }} />
        <Typography dir='ltr' variant='h3'>{rating}</Typography>
      </div>}
    </>
  )
}

export default Rating
