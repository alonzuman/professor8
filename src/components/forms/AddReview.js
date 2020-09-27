import { Button, FormGroup, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addReview } from '../../actions/professors';
import { validateStringInput } from '../../utils/form';
import heb from '../../utils/translation/heb';

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
        pid: id,
        author,
        content,
        rating,
        dateCreated: Date.now(),
        votes: 0,
        upVotesArray: [],
        downVotesArray: []
      }
      dispatch(addReview({ review, professor }))
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup className='form__group'>
        <TextField
          label={heb.author}
          variant='outlined'
          name='author'
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </FormGroup>
      <FormGroup className='form__group'>
        <TextField
          label={heb.content}
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
      <Button className='full__width-mobile' color='primary' variant='contained' type='submit'>{heb.submit}</Button>
    </form>
  )
}

export default AddReview
