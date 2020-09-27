import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, CircularProgress, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor } from '../../actions/professors';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';
import heb from '../../utils/translation/heb';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import BackButton from '../general/BackButton';
import FieldOfResearch from '../general/FieldOfResearch';
import ProfessorTags from '../general/ProfessorTags';
import AverageRating from '../general/AverageRating';

const Professor = ({ match }) => {
  const { id } = match.params
  const [addReview, setAddReview] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, tags, overallRating, avatar, reviews, school, fieldOfResearch } = professor;

  useEffect(() => { dispatch(getProfessor(id)) }, [])

  const avatarStyle = {
    height: 72,
    width: 72,
    marginLeft: '16px'
  }

  const titleStyle = {
    fontSize: 24,
    fontWeight: 600
  }

  return (
    <div dir='rtl'>
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      <BackButton variant='contained' />
      <div className='header__container justify__end'>
        {!loading ?
        <Avatar style={avatarStyle} src={avatar} alt={name}>{name?.split('')[0]}</Avatar>:
        <Skeleton style={avatarStyle} variant='circle' height={72} width={72} />}
        <div>
          <Typography style={titleStyle} variant='h4'>{name ? name : <Skeleton width={120} />}</Typography>
          <Typography variant='subtitle2'>{school ? school : <Skeleton width={150} />}</Typography>
        </div>
      </div>
      <ProfessorTags tags={tags} loading={loading} />
      <AverageRating loading={loading} averageRating={overallRating} />
      <FieldOfResearch fieldOfResearch={fieldOfResearch} loading={loading} />
      <ReviewsList professor={professor} reviews={reviews} loading={loading} />
      <Button variant='contained' className='mt-2' color='primary' onClick={() => setAddReview(true)}>{heb.addReview}</Button>
    </div>
  )
}

export default Professor
