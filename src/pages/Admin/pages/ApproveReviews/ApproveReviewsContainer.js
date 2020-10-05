import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminReviews } from '../../../../actions/admin'
import PageHeader from '../../../../components/layout/PageHeader'
import heb from '../../../../utils/translation/heb'
import ApproveReviewsList from './ApproveReviewsList'

const ApproveReviewsContainer = () => {
  const { reviews, loading } = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (reviews.length === 0) {
      dispatch(getAdminReviews())
    }
  }, [dispatch])

  return (
    <div className='rtl'>
      <PageHeader sticky backButton title={heb.manageReviews} />
      <ApproveReviewsList reviews={reviews} loading={loading} />
    </div>
  )
}

export default ApproveReviewsContainer
