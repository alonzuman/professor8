import { Button, Chip, FormGroup, Slider, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../actions/professors';
import { validateStringInput } from '../../utils/form';
import heb from '../../utils/translation/heb';

const AddReview = ({ professor, onClose }) => {
  const { uid } = useSelector(state => state.auth)
  const tagOptions = useSelector(state => state.tags.professorTags.tags)
  const [rating, setRating] = useState(5);
  const [tagsArray, setTagsArray] = useState([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [contentHelperText, setContentHelperText] = useState('')
  const dispatch = useDispatch()
  const { id } = professor

  const handleAddTag = newTags => {
    setTagsArray(newTags)
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateStringInput(content) && content.split('').length <= 120) {
      const review = {
        pid: id,
        uid,
        author,
        content,
        rating,
        dateCreated: Date.now(),
        tags: tagsArray,
        upVotesArray: [],
        downVotesArray: [],
      }
      dispatch(addReview({ review, professor }))
      onClose()
    }
  }

  const handleContentChange = e => {
    const contentLength = content.split('').length
    const newContentLength = e.target.value.split('').length
    const remaining = 120 - (newContentLength - 2)

    if (contentLength <= 120 || newContentLength < contentLength) {
      setContent(e.target.value)
    }

    if (contentLength >= 100) {
      setContentHelperText(`${heb.remaining} ${remaining} ${heb.chars}`)
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
          size='small'
          value={content}
          helperText={contentHelperText}
          onChange={handleContentChange}
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
        <div className='flex justify__between align__center'>
          <Typography variant='subtitle1'>{heb.overall}</Typography>
          <Typography variant='h4'>{rating}/5</Typography>
        </div>
        <Slider value={rating} onChange={(e, newValue) => setRating(parseInt(newValue))} step={1} min={1} max={5} marks />
      </FormGroup>
      <Button className='full__width mb-1' color='primary' variant='contained' type='submit'>{heb.submit}</Button>
    </form>
  )
}

export default AddReview
