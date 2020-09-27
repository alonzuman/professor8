import { Button, Chip, FormGroup, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addReview } from '../../actions/professors';
import { db } from '../../firebase';
import { validateStringInput } from '../../utils/form';
import heb from '../../utils/translation/heb';

const AddReview = ({ professor, onClose }) => {
  const { id } = professor
  const [rating, setRating] = useState(5);
  const [tagsArray, setTagsArray] = useState([])
  const [tagOptions, setTagOptions] = useState([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleAddTag = newTags => {
    setTagsArray(newTags)
  }

  const getTags = async () => {
    try {
      const snapshot = await db.collection('tags').doc('professorTags').get()
      let results = []
      snapshot.data().tags.forEach(v => results.push(v))
      setTagOptions(results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getTags() }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateStringInput(content)) {
      const review = {
        pid: id,
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
        <Autocomplete
          multiple
          options={tagOptions.map((v) => v)}
          defaultValue={[tagOptions[2]]}
          value={tagsArray}
          onChange={(event, newTags) => handleAddTag(newTags)}
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
        <input type='range' min='1' max='5' name='rating' onChange={e => setRating(parseInt(e.target.value))} />
      </FormGroup>
      <Button className='full__width-mobile' color='primary' variant='contained' type='submit'>{heb.submit}</Button>
    </form>
  )
}

export default AddReview
