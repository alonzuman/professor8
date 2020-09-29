import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor } from '../../actions/professors';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';
import BackButton from '../../components/general/BackButton';
import Courses from './components/Courses';
import ProfessorTags from './components/ProfessorTags';
import AverageRating from './components/AverageRating';
import ProfessorHeader from './components/ProfessorHeader';

const Professor = ({ match }) => {
  const { id } = match.params
  const [addReview, setAddReview] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, tags, overallRating, avatar, reviews, school, fieldOfResearch, courses } = professor;

  const handleAddReview = () => {
    setAddReview(true)
  }

  useEffect(() => { dispatch(getProfessor(id)) }, [])

  return (
    <div dir='rtl'>
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      <BackButton sticky={true} variant='contained' />
      <ProfessorHeader name={name} avatar={avatar} school={school} loading={!name && loading}/>
      <ProfessorTags tags={tags} loading={!tags && loading} />
      <AverageRating averageRating={overallRating} loading={!overallRating && loading} />
      <Courses courses={courses} loading={!courses && loading} />
      <ReviewsList professor={professor} reviews={reviews} loading={!reviews && loading} addReview={handleAddReview} />
    </div>
  )
}

export default Professor
