import { Button, Chip, FormGroup, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../actions/professors';
import { validateStringInput } from '../../utils/form';
import heb from '../../utils/translation/heb';
import Slider from '../general/Slider';

const AddReview = ({ professor, onClose }) => {
  const { uid } = useSelector(state => state.auth)
  const tagOptions = useSelector(state => state.tags.professorTags.tags)
  const [rating, setRating] = useState(5);
  const [tagsArray, setTagsArray] = useState([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const { id } = professor

  const handleAddTag = newTags => {
    setTagsArray(newTags)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateStringInput(content)) {
      const review = {
        pid: id,
        uid,
        author,
        content,
        rating,
        dateCreated: Date.now(),
        tags: tagsArray,
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
          size='small'
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
          size='small'
          onChange={e => setContent(e.target.value)}
          />
      </FormGroup>
      <FormGroup className='form__group'>
        <Autocomplete
          multiple
          options={tagOptions?.map((v) => v)}
          defaultValue={[tagOptions[2]]}
          value={tagsArray}
          onChange={(event, newTags) => handleAddTag(newTags)}
          size='small'
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant='outlined' label={heb.tags} placeholder={heb.tag} />
          )}
        />
      </FormGroup>
      <FormGroup className='form__group'>
        <Slider value={rating} min={1} max={5} name='rating' onChange={e => setRating(parseInt(e.target.value))} />
      </FormGroup>
      <Button className='full__width mb-1' color='primary' variant='contained' type='submit'>{heb.submit}</Button>
    </form>
  )
}

export default AddReview
