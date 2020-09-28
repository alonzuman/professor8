import React from 'react'
import ReviewSkeleton from '../../components/cards/ReviewSkeleton'
import Review from '../../components/cards/Review'
import './ReviewsList.css'
import heb from '../../utils/translation/heb'
import { Button, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import NoReviews from './NoReviews'

const ReviewsList = ({ addReview, professor, reviews, loading }) => {
  return (
    <div className='page__section'>
      <Typography variant='subtitle1'>{!loading ? reviews?.length > 0 ? heb.reviews : '' : <Skeleton width={120} />}</Typography>
      <div className='reviews_list__container'>
        {loading && [0, 0, 0, 0]?.map((v, i) => <ReviewSkeleton key={i} />)}
        {!loading && reviews?.map((review, index) => <Review professor={professor} review={review} key={index} />)}
        {!loading && reviews?.length === 0 && <NoReviews handleClick={addReview} />}
      </div>
      {!loading && reviews?.length !== 0 && <Button variant='contained' className='mt-2' color='primary' onClick={addReview}>{heb.addReview}</Button>}
      {loading && <Skeleton width={104} height={64} />}
    </div>
  )
}

export default ReviewsList
