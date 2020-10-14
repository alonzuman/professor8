import React from 'react'
import { Chip, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const ProfessorTags = ({ tags, reviewsCount, loading }) => {
  if (loading || !tags) {
    return (
      <Grid container spacing={2}>
        {!tags && [0, 0, 0, 0].map((v, i) => <Grid key={i} item><Skeleton height={48} width={68} /></Grid>)}
      </Grid>
    )
  } else if (reviewsCount > 0 && !loading && tags) {
    return (
      <Grid container spacing={1}>
        {tags && Object.keys(tags)?.sort((a, b) => { return tags[b] - tags[a] }).map((v, i) => {
          if (i <= 3) return <Grid key={v} item> <Chip className='width__fit--content rtl' color='secondary' label={<span>{v} ({tags[v]})</span>} /> </Grid>
        })}
      </Grid>
    )
  } else {
    return <div />
  }
}

export default ProfessorTags
