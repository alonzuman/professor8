import { Avatar, Card, CardContent, CardHeader, Chip, Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';
import heb from '../../utils/translation/heb';

const School = ({ handleClose }) => {
  const { school } = useSelector(state => state.schools)

  return (
    <Card dir='rtl'>
      <CardHeader
        title={school?.name}
        subheader={school?.type}
        action={<IconButton onClick={handleClose}><CloseIcon /></IconButton>}
        avatar={<Avatar src={school?.avatar} alt={school?.name}>{school?.name?.split('')[0]}</Avatar>}
      />
      <CardContent>
        <Typography variant='subtitle1'>{heb.faculties}</Typography>
        <Grid container spacing={1}>
          {school?.departures?.map((v, i) => <Grid key={i} item><Chip label={v.name} /></Grid>)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default School
