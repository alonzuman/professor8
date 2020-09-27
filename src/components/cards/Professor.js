import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, CircularProgress, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor } from '../../actions/professors';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';
import CloseIcon from '@material-ui/icons/Close';
import heb from '../../utils/translation/heb';

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
          subheader={school}
          action={<IconButton onClick={handleClose}><CloseIcon /></IconButton>}
        />
        <CardContent>
          {fieldOfResearch &&
          <>
            <Typography variant='subtitle1'>{heb.fieldOfResearch}</Typography>
            <div className='reviews_list__container'>
              {fieldOfResearch?.map((v, i) => <Chip size='small' variant='outlined' key={i} label={v}/>)}
            </div>
          </>}

          {reviews?.length > 0 &&
          <>
            <Typography variant='subtitle1'>{heb.reviews}</Typography>
            <ReviewsList reviews={reviews} loading={loading} />
          </>}
        </CardContent>
        <CardActions>
          <Button variant='contained' color='primary' onClick={() => setAddReview(true)}>{heb.addReview}</Button>
        </CardActions>
      </Card>
    )
  }
}

export default Professor
