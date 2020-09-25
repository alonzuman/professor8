import { CircularProgress, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import AddReviewContainer from '../containers/AddReviewContainer';
import ReviewsList from '../containers/ReviewsList';
import { db } from '../firebase';

const Professor = ({ match }) => {
  const [loading, setLoading] = useState(false)
  const [addReview, setAddReview] = useState(false)
  const [professor, setProfessor] = useState({})
  const { params } = match;
  const { id } = params
  console.log(match)

  const fetchUser = async () => {
    setLoading(true)
    try {
      const snapshot = await db.collection('professors').doc(id).get()
      setProfessor({ id: snapshot.id, ...snapshot.data() })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => { fetchUser() }, [])

  if (loading) {
    return <CircularProgress />
  } else {
    return (
      <div className='page__container'>
        <h1>{professor.name}</h1>
        <ReviewsList id={id} />
        <Button onClick={() => setAddReview(true)}>Add Review</Button>
        <AddReviewContainer professor={professor} open={addReview} onClose={() => setAddReview(false)} />
      </div>
    )
  }
}

export default Professor
