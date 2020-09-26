import { Card, CardContent, CardHeader, Chip, Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';

const School = ({ handleClose }) => {
  const { school } = useSelector(state => state.schools)

  return (
    <Card dir='rtl'>
      <CardHeader
        title={school?.name}
        subheader={school?.type}
        action={<IconButton onClick={handleClose}><CloseIcon /></IconButton>}
      />
      <CardContent>
        <Typography variant='subtitle1'>Faculties</Typography>
        <Grid container spacing={1}>
          {school?.departures?.map((v, i) => <Grid key={i} item><Chip label={v.name} /></Grid>)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default School
