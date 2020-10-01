import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { adminApproveReview, adminDeclineReview } from '../../../../actions/admin'
import heb from '../../../../utils/translation/heb'

const ApproveReviewCardActions = ({ review }) => {
  const dispatch = useDispatch()

  const handleClick = type => {
    if (type === 'approve') {
      return dispatch(adminApproveReview(review))
    } else {
      return dispatch(adminDeclineReview(review))
    }
  }

  return (
    <div className='flex align__center full__width'>
      <Button onClick={() => handleClick('approve')} color='primary' variant='contained' className='full__width'>
        {heb.approve}
      </Button>
      <Button onClick={() => handleClick('decline')} className='full__width'>
        {heb.decline}
      </Button>
    </div>
  )
}

export default ApproveReviewCardActions
