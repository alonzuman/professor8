import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor, getSavedLists, saveProfessor, unsaveProfessor } from '../../actions';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';
import BackButton from '../../components/general/BackButton';
import Courses from './components/Courses';
import ProfessorTags from './components/ProfessorTags';
import AverageRating from './components/AverageRating';
import ProfessorHeader from './components/ProfessorHeader';
import EditProfessorContainer from '../../containers/dialogs/EditProfessorContainer';
import ProfessorFooter from './components/ProfessorFooter';
import SaveProfessorContainer from '../../containers/dialogs/SaveProfessorContainer';
import { Paper } from '@material-ui/core';
import ProfessorHeaderControls from './components/ProfessorHeaderControls';

const Professor = ({ match }) => {
  const { uid, role, anonymous, savedIds } = useSelector(state => state.auth)
  const tagsLoading = useSelector(state => state.tags.loading)
  const { id } = match.params
  const [addReview, setAddReview] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, tags, rating, avatar, reviewsCount, school, courses } = professor;

  const handleSave = async ({ list }) => {
    if (saved) {
      await dispatch(unsaveProfessor({ pid: id }))
      await setSaved(false)
    } else {
      await dispatch(saveProfessor({ pid: id, list }))
      await setSaved(true)
    }
    await setSaving(false)
  }

  const handleAddReview = () => {
    setAddReview(true)
  }

  useEffect(() => {
    if (savedIds) {
      const isSaved = savedIds.includes(id)
      if (isSaved) {
        setSaved(true)
      }
    }
  }, [savedIds])

  useEffect(() => {
    dispatch(getProfessor(id))
  }, [id, dispatch])

  return (
    <div className='rtl pb-4'>
      <SaveProfessorContainer open={saving} onClose={() => setSaving(false)} action={handleSave} />
      <EditProfessorContainer open={editing} onClose={() => setEditing(false)} />
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      <ProfessorHeaderControls
        saved={saved}
        setSaving={saved ? handleSave : () => setSaving(true)}
        anonymous={anonymous}
        uid={uid}
        professor={professor}
        setEditing={() => setEditing(true)}
        role={role} />
      <Paper className='mt-2 pt-1 pb-2 pr-2 pl-2 mr-2 ml-2 br-2'>
        <ProfessorHeader name={name} avatar={avatar} school={school} loading={!name && loading}/>
        <ProfessorTags reviewsCount={reviewsCount} tags={tags} loading={!tags && loading && !professor} />
        <AverageRating reviewsCount={reviewsCount} averageRating={rating} loading={!rating && loading} />
        <Courses courses={courses} loading={!courses && loading && !professor} />
      </Paper>
      <ReviewsList professor={professor} addReview={handleAddReview} />
      <ProfessorFooter loading={tagsLoading} onClick={handleAddReview} />
    </div>
  )
}

export default Professor
