import { Avatar, Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor } from '../../actions/professors';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';
import heb from '../../utils/translation/heb';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import BackButton from '../../components/general/BackButton';
import FieldOfResearch from './components/FieldOfResearch';
import ProfessorTags from './components/ProfessorTags';
import AverageRating from './components/AverageRating';
import ProfessorHeader from './components/ProfessorHeader';

const Professor = ({ match }) => {
  const { id } = match.params
  const [addReview, setAddReview] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, tags, overallRating, avatar, reviews, school, fieldOfResearch } = professor;

  const handleAddReview = () => {
    setAddReview(true)
  }

  useEffect(() => { dispatch(getProfessor(id)) }, [])

  return (
    <div dir='rtl'>
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      <BackButton variant='contained' />
      <ProfessorHeader loading={loading} name={name} avatar={avatar} school={school} />
      <ProfessorTags tags={tags} loading={loading} />
      <AverageRating loading={loading} averageRating={overallRating} />
      <FieldOfResearch fieldOfResearch={fieldOfResearch} loading={loading} />
      <ReviewsList professor={professor} reviews={reviews} loading={loading} addReview={handleAddReview} />
    </div>
  )
}

export default Professor
