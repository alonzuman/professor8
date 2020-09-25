import { Button, FormControl, FormGroup, Slider, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { db } from '../../firebase';
import firebase from 'firebase';
import { validateStringInput } from '../../utils/form';

const AddReview = ({ professor, onClose }) => {
  const { id } = professor
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateStringInput(content)) {
      try {
        const review = {
          id,
          content,
          rating,
          upVotes: 0,
          downVotes: 0
        }
        await db.collection('professors').doc(id).set({
          lastReview: review
        }, { merge: true })
        await db.collection('professors').doc(id).collection('reviews').add(review)
        console.log('added')
        onClose()
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('string not valid')
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
