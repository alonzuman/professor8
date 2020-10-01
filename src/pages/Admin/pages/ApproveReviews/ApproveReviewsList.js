import { CircularProgress } from '@material-ui/core'
import React from 'react'
import ApproveReviewCard from './ApproveReviewCard'

const ApproveReviewsList = ({ reviews, loading }) => {
  return (
    <div>
      {loading && <CircularProgress />}
      {reviews?.map((v, i) => <ApproveReviewCard key={i} review={v} />)}
    </div>
  )
}

export default ApproveReviewsList
