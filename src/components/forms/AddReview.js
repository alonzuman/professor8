import { Button, Checkbox, Chip, CircularProgress, FormControlLabel, FormGroup, Slider, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../actions';
import { validateStringInput } from '../../utils/form';
import heb from '../../utils/translation/heb';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const AddReview = ({ professor, onClose }) => {
  const { uid } = useSelector(state => state.auth)
  const tagOptions = useSelector(state => state.tags.professorTags.tags)
  const courseOptions = useSelector(state => state.tags.courses.names)
  const { loading } = useSelector(state => state.reviews)
  const [rating, setRating] = useState(5);
  const [tagsArray, setTagsArray] = useState([])
  const [author, setAuthor] = useState(heb.annonymous)
  const [content, setContent] = useState('')
  const [attendance, setAttendance] = useState(false)
  const [wouldTakeAgain, setWouldTakeAgain] = useState(false)
  const [courses, setCourses] = useState([])
  const [difficulty, setDifficulty] = useState(5)
  const [contentHelperText, setContentHelperText] = useState('')
  const dispatch = useDispatch()

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 5
  });

  const handleAddCourse = newCourses => {
    if (courses.length <= 5) {
      setCourses(newCourses)
    }
  }

  const handleAddTag = newTags => {
    if (tagsArray.length <= 5) {
      setTagsArray(newTags)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateStringInput(content) && content.split('').length <= 120 && tagsArray.length !== 0) {
      const review = {
        uid,
        author: author,
        rating,
        content,
        wouldTakeAgain,
        attendance,
        difficulty,
        courses,
        tags: tagsArray,
        downVotesArray: [],
        upVotesArray: []
      }

      await dispatch(addReview({ review, professor }))
      await onClose()
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
          dir='rtl'
          filterOptions={filterOptions}
          options={courseOptions?.map(v => v)}
          defaultValue={[courseOptions[2]]}
          value={courses}
          onChange={(event, newCourses) => handleAddCourse(newCourses)}
          size='small'
          renderOption={v => <div className='autocomplete__option'>{v}</div>}
          renderTags={(value, getTagProps) =>
            value?.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant='outlined' label={heb.courses} placeholder={heb.courseName} />
          )}
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
        <FormControlLabel
          control={<Checkbox className='width__fit--content' checked={attendance} onChange={e => setAttendance(e.target.checked)} />}
          label={heb.attendance}
        />
      </FormGroup>
      <FormGroup className='form__group'>
        <FormControlLabel
          control={<Checkbox className='width__fit--content' checked={wouldTakeAgain} onChange={e => setWouldTakeAgain(e.target.checked)} />}
          label={heb.wouldTakeAgain}
        />
      </FormGroup>
      <FormGroup className='form__group'>
        <div className='flex justify__between align__center'>
          <Typography variant='subtitle1'>{heb.difficulty}</Typography>
          <Typography variant='h4'>{difficulty}/5</Typography>
        </div>
        <Slider value={difficulty} onChange={(e, newValue) => setDifficulty(newValue)} step={1} min={1} max={5} marks />
      </FormGroup>
      <FormGroup className='form__group'>
        <div className='flex justify__between align__center'>
          <Typography variant='subtitle1'>{heb.overall}</Typography>
          <Typography variant='h4'>{rating}/5</Typography>
        </div>
        <Slider value={rating} onChange={(e, newValue) => setRating(parseInt(newValue))} step={1} min={1} max={5} marks />
      </FormGroup>
      <Button disabled={loading} className='full__width mb-1' color='primary' variant='contained' type='submit'>{loading ? <CircularProgress className='spinner__small' /> : heb.submit}</Button>
    </form>
  )
}

export default AddReview
