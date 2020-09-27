import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, CircularProgress, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor } from '../../actions/professors';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import heb from '../../utils/translation/heb';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';

const Professor = ({ match }) => {
  const { id } = match.params
  const [addReview, setAddReview] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, avatar, reviews, school, fieldOfResearch } = professor;
  const history = useHistory()

  useEffect(() => { dispatch(getProfessor(id)) }, [])

  return (
    <div dir='rtl'>
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      <IconButton onClick={() => history.goBack()}><KeyboardArrowRightIcon /></IconButton>
      <div style={{ justifyContent: 'end' }} className='header__container'>
        {!loading ?
        <Avatar style={{ height: 72, width: 72, marginLeft: '16px' }} src={avatar} alt={name}>{name?.split('')[0]}</Avatar>:
        <Skeleton style={{ height: 72, width: 72, marginLeft: '16px' }} variant='circle' height={72} width={72} />}
        <div>
          <Typography variant='h3'>{name ? name : <Skeleton width={120} />}</Typography>
          <Typography variant='subtitle1'>{school ? school : <Skeleton width={150} />}</Typography>
        </div>
      </div>
      <CardContent>
        {fieldOfResearch &&
        <>
          <Typography variant='subtitle1'>{heb.fieldOfResearch}</Typography>
          <div className='reviews_list__container'>
            {fieldOfResearch?.map((v, i) => <Chip size='small' variant='outlined' key={i} label={v}/>)}
          </div>
        </>}
        <ReviewsList professor={professor} reviews={reviews} loading={loading} />
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary' onClick={() => setAddReview(true)}>{heb.addReview}</Button>
      </CardActions>
    </div>
  )
}

export default Professor
