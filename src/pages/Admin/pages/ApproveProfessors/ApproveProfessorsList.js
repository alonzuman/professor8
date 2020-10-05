import { Grid } from '@material-ui/core'
import React from 'react'
import ReviewSkeleton from '../../../../components/cards/ReviewSkeleton'
import ApproveProfessorCard from './ApproveProfessorCard'

const ApproveProfessorsList = ({ loading, professors }) => {
  return (
    <Grid container spacing={2}>
      {loading && professors.length === 0 && [0, 0, 0, 0].map((v, i) => <Grid xs={12} md={6} lg={4} key={i} item><ReviewSkeleton /></Grid>)}
      {professors?.map((v, i) => <Grid key={i} xs={12} md={6} lg={4} item><ApproveProfessorCard loading={loading} professor={v} /></Grid>)}
    </Grid>
  )
}

export default ApproveProfessorsList
