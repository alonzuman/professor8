import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor, saveProfessor, unsaveProfessor } from '../../actions/professors';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';
import BackButton from '../../components/general/BackButton';
import Courses from './components/Courses';
import ProfessorTags from './components/ProfessorTags';
import AverageRating from './components/AverageRating';
import ProfessorHeader from './components/ProfessorHeader';
import EditProfessorDialog from '../../containers/dialogs/EditProfessorDialog';
import ProfessorAction from './components/ProfessorAction';

const Professor = ({ match }) => {
  const { uid, role, anonymous, savedProfessors } = useSelector(state => state.auth)
  const { id } = match.params
  const [addReview, setAddReview] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, tags, overallRating, avatar, reviews, school, courses } = professor;

  const handleSave = async () => {
    if (saved) {
      await dispatch(unsaveProfessor(professor))
    } else {
      await dispatch(saveProfessor(professor))
    }
    await setSaved(v => !v)
  }

  const handleAddReview = () => {
    setAddReview(true)
  }

  useEffect(() => {
    const isSaved = savedProfessors?.find(v => v.id === id)
    if (isSaved) {
      setSaved(true)
    }
  }, [savedProfessors])

  useEffect(() => {
    dispatch(getProfessor(id))
    console.log(savedProfessors)
  }, [id, dispatch])

  return (
    <div dir='rtl'>
      <EditProfessorDialog open={editing} onClose={() => setEditing(false)} />
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      <div className='flex justify__between pr-2 pl-2'>
        <BackButton sticky={true} variant='contained' />
        <ProfessorAction
          saved={saved}
          setSaved={handleSave}
          anonymous={anonymous}
          uid={uid}
          professor={professor}
          setEditing={() => setEditing(true)}
          role={role}
        />
      </div>
      <ProfessorHeader name={name} avatar={avatar} school={school} loading={!name && loading}/>
      <ProfessorTags reviewsCount={reviews?.length} tags={tags} loading={!tags && loading && !professor} />
      <AverageRating reviewsCount={reviews?.length} averageRating={overallRating} loading={!overallRating && loading} />
      <Courses courses={courses} loading={!courses && loading && !professor} />
      <ReviewsList professor={professor} addReview={handleAddReview} />
    </div>
  )
}

export default Professor
