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
import EditProfessorDialog from '../../containers/dialogs/EditProfessorDialog';
import ProfessorAction from './components/ProfessorAction';
import ProfessorFooter from './components/ProfessorFooter';
import SaveProfessorContainer from '../../containers/dialogs/SaveProfessorContainer';

const Professor = ({ match }) => {
  const { uid, role, anonymous, savedProfessors } = useSelector(state => state.auth)
  const { ids, lists } = useSelector(state => state.saved)
  const { id } = match.params
  const [addReview, setAddReview] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)
  const { name, tags, overallRating, avatar, reviews, school, courses } = professor;

  const handleSave = async listName => {

    if (saved) {
      let oldName;
      Object.keys(lists).forEach(v => {
        if (Boolean(lists[v].filter(prof => prof.id !== id))) {
          oldName = v
        }
      })
      await dispatch(unsaveProfessor({ professor, list: oldName }))
      await setSaved(false)
    } else {
      await dispatch(saveProfessor({ professor, list: listName }))
      await setSaved(true)
    }
    await setSaving(false)
  }

  const handleAddReview = () => {
    setAddReview(true)
  }

  useEffect(() => {
    if (ids) {
      const isSaved = ids.includes(id)
      if (isSaved) {
        setSaved(true)
      }
    }
  }, [ids])

  useEffect(() => {
    dispatch(getProfessor(id))
  }, [id, dispatch])

  return (
    <div dir='rtl'>
      <SaveProfessorContainer open={saving} onClose={() => setSaving(false)} action={handleSave} />
      <EditProfessorDialog open={editing} onClose={() => setEditing(false)} />
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      <div className='flex justify__between pr-2 pl-2'>
        <BackButton sticky={true} variant='contained' />
        <ProfessorAction
          saved={saved}
          setSaving={saved ? handleSave : () => setSaving(true)}
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
      <ProfessorFooter addReview={handleAddReview} />
    </div>
  )
}

export default Professor
