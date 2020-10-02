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
import EditButton from '../../components/general/EditButton';
import EditProfessorDialog from '../../containers/dialogs/EditProfessorDialog';

const Professor = ({ match }) => {
  const uid = useSelector(state => state.auth.uid)
  const { id } = match.params
  const [addReview, setAddReview] = useState(false)
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, tags, overallRating, avatar, reviews, school, courses } = professor;

  const handleAddReview = () => {
    setAddReview(true)
  }

  useEffect(() => { dispatch(getProfessor(id)) }, [id])

  return (
    <div dir='rtl'>
      <EditProfessorDialog open={editing} onClose={() => setEditing(false)} />
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      <div className='flex justify__between'>
        <BackButton sticky={true} variant='contained' />
        {uid === professor.uid && <EditButton onClick={() => setEditing(true)} sticky={true} variant='contained' />}
      </div>
      <ProfessorHeader name={name} avatar={avatar} school={school} loading={!name && loading}/>
      <ProfessorTags tags={tags} loading={!tags && loading && !professor} />
      <AverageRating reviewsCount={reviews?.length} averageRating={overallRating} loading={!overallRating && loading} />
      <Courses courses={courses} loading={!courses && loading && !professor} />
      <ReviewsList professor={professor} reviews={reviews} loading={loading} addReview={handleAddReview} />
    </div>
  )
}

export default Professor
