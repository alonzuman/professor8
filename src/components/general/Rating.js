import { Typography } from '@material-ui/core'
import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import { Skeleton } from '@material-ui/lab';

const Rating = ({ big = false, rating, loading, icon = 'heart', showTotal = false }) => {

  if (!loading && rating === 0) {
    return <div/>
  } else {
    return (
      <>
        {loading && !rating && <Skeleton height={60} width={60} />}
        {!loading && rating &&
        <div className='flex align__center'>
          {icon === 'star' && <StarIcon style={{ color: 'var(--primary-light)', height: 16, width: 16, marginLeft: 4 }} />}
          {icon === 'heart' && <FavoriteIcon style={{ color: 'red', height: 16, width: 16, marginLeft: 4 }} />}
          {rating !== 0 && <Typography dir='ltr' variant={big ? 'h2' : 'h4'}>{rating?.toFixed(2)}{showTotal && '/5'}</Typography>}
          {!rating && <Skeleton height={32} width={48} />}
        </div>}
      </>
    )
  }
}

export default Rating
