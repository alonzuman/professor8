import React, { useEffect, useState } from 'react'
import ReviewSkeleton from '../../components/cards/ReviewSkeleton'
import Review from '../../components/cards/Review'
import './ReviewsList.css'
import heb from '../../utils/translation/heb'
import { Button, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import NoReviews from './NoReviews'
import { useSelector } from 'react-redux'
import ReviewsSwiper from './ReviewsSwiper'

const ReviewsList = ({ addReview, professor, reviews, loading }) => {
  const { isAuth } = useSelector(state => state.auth)
  const [width, setWidth] = useState()
  const [show, setShow] = useState(false)

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
        <Skeleton width={120} height={24} />
        <ReviewSkeleton />
      </div>
    )
  } else if (!loading && reviews?.length !== 0) {
    return (
      <div className='page__section'>
        <Typography variant='subtitle1'>{reviews?.length > 0 ? heb.reviews : ''}</Typography>
        <ReviewsSwiper loading={loading} reviews={reviews} professor={professor} viewWidth={width} />
      </div>
    )
  } else {
    return <NoReviews handleClick={addReview} />
  }
}

export default ReviewsList
