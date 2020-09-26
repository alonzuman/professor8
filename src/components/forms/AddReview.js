import { Button, FormGroup, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addReview } from '../../actions/professors';
import { validateStringInput } from '../../utils/form';

const AddReview = ({ professor, onClose }) => {
  const { id } = professor
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateStringInput(content)) {
      const review = {
        id,
        author,
        content,
        rating,
        dateCreated: Date.now(),
        upVotes: 0,
        downVotes: 0
      }
      dispatch(addReview(review))
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup className='form__group'>
        <TextField
          label='Author'
          variant='outlined'
          name='author'
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </FormGroup>
      <FormGroup className='form__group'>
        <TextField
          label='Content'
          multiline
          rows={4}
          variant='outlined'
          name='content'
          onChange={e => setContent(e.target.value)}
        />
      </FormGroup>
      <FormGroup className='form__group'>
        <input type='range' min='1' max='5' name='rating' onChange={e => setRating(parseInt(e.target.value))} />
      </FormGroup>
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default AddReview
