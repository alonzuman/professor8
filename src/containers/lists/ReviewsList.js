import React from 'react'
import ReviewSkeleton from '../../components/cards/ReviewSkeleton'
import Review from '../../components/cards/Review'
import './ReviewsList.css'
import heb from '../../utils/translation/heb'
import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const ReviewsList = ({ professor, reviews, loading }) => {
  return (
    <>
      <Typography variant='subtitle1'>{!loading ? reviews?.length > 0 ? heb.reviews : '' : <Skeleton width={120} />}</Typography>
      <div className='reviews_list__container'>
        {loading && [0, 0, 0, 0]?.map((v, i) => <ReviewSkeleton key={i} />)}
        {!loading && reviews?.map((review, index) => <Review professor={professor} review={review} key={index} />)}
      </div>
    </>
  )
}

export default ReviewsList
