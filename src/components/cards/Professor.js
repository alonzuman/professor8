import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, CircularProgress, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor } from '../../actions/professors';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';
import CloseIcon from '@material-ui/icons/Close';

const Professor = ({ id, handleClose }) => {
  const [addReview, setAddReview] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, avatar, reviews, school, fieldOfResearch } = professor;

  useEffect(() => { dispatch(getProfessor(id)) }, [])

  if (loading) {
    return <CircularProgress />
  } else {
    return (
      <Card dir='rtl'>
        <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
        <CardHeader
          avatar={<Avatar src={avatar} alt={name}>{name?.split('')[0]}</Avatar>}
          title={name}
          subheader={school?.name}
          action={<IconButton onClick={handleClose}><CloseIcon /></IconButton>}
        />
        <CardContent>
          <Typography variant='subtitle1'>Field of research</Typography>
          <Grid spacing={1} container>
            {fieldOfResearch?.map((v, i) => <Grid item key={i}><Chip label={v}/></Grid>)}
          </Grid>
        </CardContent>
        <ReviewsList reviews={reviews} loading={loading} />
        <CardActions>
          <Button variant='contained' color='primary' onClick={() => setAddReview(true)}>Add Review</Button>
        </CardActions>
      </Card>
    )
  }
}

export default Professor
