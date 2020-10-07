import React, { useEffect, useState } from 'react'
import ReviewSkeleton from '../../components/cards/ReviewSkeleton'
import './ReviewsList.css'
import heb from '../../utils/translation/heb'
import { Button, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import NoReviews from './NoReviews'
import { useSelector } from 'react-redux'
import ReviewsSwiper from './ReviewsSwiper'

const ReviewsList = ({ addReview, professor }) => {
  const { isAuth } = useSelector(state => state.auth)
  const [width, setWidth] = useState()
  const { loading, reviews } = useSelector(state => state.reviews)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  if (loading) {
    return (
      <div className='page__section rtl'>
        <Skeleton className='mb-2' width={120} height={24} />
        <Grid container>
          <Grid item xs={12} md={4} lg={4}>
            <ReviewSkeleton className='mw-512' />
          </Grid>
        </Grid>
      </div>
    )
  } else if (!loading && reviews?.length !== 0) {
    return (
      <div className='flex flex__column align__center pl-0 pr-0'>
        <div className='page__section'>
          {isAuth && <Button color='primary' variant='contained' className='mb-1' onClick={addReview}>{heb.addReview}</Button>}
          <Typography variant='subtitle1'>{reviews?.length > 0 ? `${heb.reviews} (${reviews.length})` : ''}</Typography>
        </div>
        <ReviewsSwiper loading={loading} reviews={reviews} viewWidth={width} />
      </div>
    )
  } else {
    return <NoReviews handleClick={addReview} />
  }
}

export default ReviewsList
