import { CircularProgress } from '@material-ui/core'
import React from 'react'
import ApproveReviewCard from './ApproveReviewCard'

const ApproveReviewsList = ({ reviews, loading }) => {
  return (
    <>
      {loading && <CircularProgress />}
      {reviews?.map((v, i) => <ApproveReviewCard key={i} review={v} />)}
    </>
  )
}

export default ApproveReviewsList
