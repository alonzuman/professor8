import { Grid } from '@material-ui/core'
import React from 'react'
import ReviewSkeleton from '../../../../components/cards/ReviewSkeleton'
import heb from '../../../../utils/translation/heb'
import NoResults from '../../../Results/components/NoResults'
import ApproveReviewCard from './ApproveReviewCard'

const ApproveReviewsList = ({ reviews, loading }) => {
  return (
    <Grid container spacing={2}>
      {loading && reviews.length === 0 && [0, 0, 0, 0].map((v, i) => <Grid key={i} xs={12} lg={4} md={6} item><ReviewSkeleton /></Grid>)}
      {reviews?.map((v, i) => <Grid item xs={12} lg={4} md={6}  key={i}><ApproveReviewCard loading={loading} review={v} /></Grid>)}
      {!loading && reviews.length === 0 && <NoResults centered msg={heb.noReviewsFound} />}
    </Grid>
  )
}

export default ApproveReviewsList
