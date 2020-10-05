import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'
import ApproveReviewCard from './ApproveReviewCard'

const ApproveReviewsList = ({ reviews, loading }) => {
  return (
    <Grid container spacing={2}>
      {loading && <CircularProgress />}
      {reviews?.map((v, i) => <Grid item key={i}><ApproveReviewCard review={v} /></Grid>)}
    </Grid>
  )
}

export default ApproveReviewsList
