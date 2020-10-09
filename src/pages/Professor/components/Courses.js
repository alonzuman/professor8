import { Button, Chip, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useState } from 'react'
import heb from '../../../utils/translation/heb'

const Courses = ({ courses, loading }) => {
  const [show, setShow] = useState(false)

  if (!loading && !courses) return <div />

  return (
    <div className='mt-2'>
      <Typography variant='subtitle1'>
        {!loading ? courses?.length > 0 ? heb.courses : '' : <Skeleton className='mb-1' width={120} />}
      </Typography>
      <Grid container spacing={1}>
        {loading && [0, 0, 0, 0].map((v, i) => <Grid item key={i} ><Chip size='small' style={{ width: 60 }} /></Grid>)}
        {!loading && courses?.map((v, i) => {
          if (!show && i <= 2) {
            return <Grid item key={i} ><Chip size='small' variant='outlined' label={v} /></Grid>
          } else {
            return <Grid item key={i} ><Chip size='small' variant='outlined' label={v} /></Grid>
          }}
        )}
      </Grid>
      {courses?.length > 2 && <Button className='small__btn' color='primary' onClick={() => setShow(!show)}>{loading ? <Skeleton width={80} /> : show ? heb.hide : heb.showAll}</Button>}
    </div>
  )
}

export default Courses
