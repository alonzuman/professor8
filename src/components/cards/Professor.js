import { Button, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfessor } from '../../actions/professors';
import AddReviewContainer from '../../containers/dialogs/AddReviewContainer';
import ReviewsList from '../../containers/lists/ReviewsList';

const Professor = ({ id }) => {
  const [addReview, setAddReview] = useState(false)
  const dispatch = useDispatch()
  const { loading, professor } = useSelector(state => state.professors)

  useEffect(() => { dispatch(getProfessor(id)) }, [])

  return (
    <div className='page__container'>
      <h1>{professor.name}</h1>
      <ReviewsList reviews={professor.reviews} loading={loading} />
      <Button onClick={() => setAddReview(true)}>Add Review</Button>
      <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
    </div>
  )
}

export default Professor
