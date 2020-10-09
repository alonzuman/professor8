import React from 'react'
import { Chip, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const ProfessorTags = ({ tags, reviewsCount, loading }) => {

  if (loading || !tags) {
    return (
      <div className='page__section flex flex__wrap--wrap'>
        {!tags && [0, 0, 0, 0].map((v, i) => <Skeleton key={i} className='ml-2' height={48} width={68} />)}
      </div>
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
