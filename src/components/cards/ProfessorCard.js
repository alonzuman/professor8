import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddReviewContainer from '../../containers/AddReviewContainer';
import './ProfessorCard.css';
import Review from './Review';
import { Button } from '@material-ui/core';

const ProfessorCard = ({ professor }) => {
  const [addReview, setAddReview] = useState(false)
  const { name, tags, lastReview, id, departure, university, reviews, role, overallRating } = professor

  return (
    <div className='professor_card__container'>
      <AddReviewContainer open={addReview} onClose={() => setAddReview(false)} professor={professor} />
      <Link className='a__neutral' to={`/professor/${id}`}>
        <div className='professor_card__title'>
          <h3>{name}</h3>
          <small>Role</small>
          <p>{role}</p>
          {/* <h2>{overallRating}</h2> */}
        </div>
      </Link>
      <div className='professor_card__body'>
        {lastReview &&
        <>
        <small>Last Review</small>
        <Review review={lastReview} />
        </>}
        <Button onClick={() => setAddReview(true)}>Add Review</Button>
      </div>
    </div>
  )
}

export default ProfessorCard
