import { Button, FormControl, FormGroup, Slider, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addReview } from '../../actions/professors';
import { db } from '../../firebase';
import { validateStringInput } from '../../utils/form';

const AddReview = ({ professor, onClose }) => {
  const { id } = professor
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateStringInput(content)) {
      const review = {
        id,
        content,
        rating,
        upVotes: 0,
        downVotes: 0
      }
      dispatch(addReview(review))
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          label='Content'
          multiline
          rows={4}
          variant='outlined'
          name='content'
          onChange={e => setContent(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <input type='range' min='1' max='5' name='rating' onChange={e => setRating(parseInt(e.target.value))} />
      </FormGroup>
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default AddReview
