import React from 'react'
import { CircularProgress } from '@material-ui/core'
import Review from '../../components/cards/Review'

const ReviewsList = ({ reviews, loading }) => {
  if (loading) {
    return <CircularProgress />
  } else {
    return (
      <div className='reviews_list__container'>
        {reviews?.map((review, index) => <Review review={review} key={index} />)}
      </div>
    )
  }
}

export default ReviewsList
