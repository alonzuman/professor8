import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminReviews } from '../../../../actions/admin'
import ApproveReviewsList from './ApproveReviewsList'

const ApproveReviewsContainer = () => {
  const { reviews, loading } = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAdminReviews())
  }, [])

  return (
    <>
      <Typography variant='h1'>Approve reviews</Typography>
      <ApproveReviewsList reviews={reviews} loading={loading} />
    </>
  )
}

export default ApproveReviewsContainer
