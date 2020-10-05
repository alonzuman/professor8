import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import heb from '../../../../utils/translation/heb'

const ApproveReviewCardActions = ({ loading, handleApprove, handleDecline }) => {
  return (
    <div className='flex align__center full__width'>
      <Button disabled={loading} onClick={handleApprove} color='primary' variant='contained' className='full__width'>
        {loading ? <CircularProgress color='default' className='spinner__small' /> : heb.approve}
      </Button>
      <Button disabled={loading} onClick={handleDecline} className='full__width'>
        {heb.decline}
      </Button>
    </div>
  )
}

export default ApproveReviewCardActions
