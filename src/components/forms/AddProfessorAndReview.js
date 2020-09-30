import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Chip, CircularProgress, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@material-ui/core';
import { validateArrays, validateNumbers, validateStringInput, validateStringInputs } from '../../utils';
import heb from '../../utils/translation/heb';
import SearchBar from '../general/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { addProfessorAndReview } from '../../actions/professors';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const AddProfessorAndReview = ({ onClose }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, newId } = useSelector(state => state.professors)
  const { uid } = useSelector(state => state.auth)
  const tagOptions = useSelector(state => state.tags.professorTags.tags)
  const courseOptions = useSelector(state => state.tags.courses.names)
  const professorOptions = useSelector(state => state.tags.professors)
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [school, setSchool] = useState('')
  const [content, setContent] = useState('')
  const [difficulty, setDifficulty] = useState(5)
  const [rating, setRating] = useState(5)
  const [attendance, setAttendance] = useState(false)
  const [wouldTakeAgain, setWouldTakeAgain] = useState(false)
  const [courses, setCourses] = useState([])
  const [tagsArray, setTagsArray] = useState([])

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
    e.preventDefault()
    const professor = {
      uid,
      name,
      school,
      difficulty,
      tags: tagsArray,
      numberOfReviews: 0,
      courses,
      overallRating: rating,
    }

    const review = {
      uid,
      author: author || heb.annonymous,
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

    if (validateStringInputs([name, school, content])) {
      await dispatch(addProfessorAndReview({ professor, review }))
      onClose()
    } else {
      console.log('string not full')
    }
  }

  useEffect(() => {
    if (newId) {
      return history.push({
        pathname: `/professor/${newId}`
      })
    }
  }, [newId])

  return (
    <form dir='rtl' onSubmit={handleSubmit}>
      <FormGroup className='form__group'>
        <SearchBar
          search={school}
          setSearch={setSchool}
          filterOptions={filterOptions}
          collection={'tags'}
          doc={'schools'}
          filter={'names'}
          placeholder={heb.institution}
          dir='rtl'
          size='small'
          style={{ marginTop: 0 }}
        />
      </FormGroup>
      {school &&
      <FormGroup className='form__group'>
        <Autocomplete
          style={{ marginTop: 0 }}
          dir='rtl'
          handleHomeEndKeys
          autoHighlight
          size='small'
          placeholder={heb.fullProfessorName}
          options={professorOptions[school] || []}
          freeSolo
          value={name}
          onChange={(event, newValue) => setName(newValue)}
          renderInput={(params) => <TextField value={name} onChange={e => setName(e.target.value)} size='small' variant='outlined' label={heb.fullProfessorName} {...params} />}
          renderOption={option => <div style={{ textAlign: 'right', width: '100%' }} >{option}</div>}
        />
      </FormGroup>}
      {school && name &&
      <>
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
      </>}
      {school && name &&
      <div className='form__section'>
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
            renderOption={v => <div style={{ textAlign: 'right', width: '100%' }} >{v}</div>}
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
        <FormGroup>
          <Autocomplete
            multiple
            options={tagOptions?.map((v) => v)}
            defaultValue={[tagOptions[2]]}
            value={tagsArray}
            onChange={(event, newTags) => handleAddTag(newTags)}
            filterOptions={filterOptions}
            size='small'
            renderOption={v => <div style={{ textAlign: 'right', width: '100%' }} >{v}</div>}
            renderTags={(value, getTagProps) =>
              value?.map((option, index) => (
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
          <Slider value={rating} onChange={(e, newValue) => setRating(newValue)} step={1} min={1} max={5} marks />
        </FormGroup>
        <FormGroup className='form__group'>
          <TextField size='small' variant='outlined' label={heb.author} onChange={e => setAuthor(e.target.value)} />
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
      </div>}
      <Button disabled={loading} className='full__width mt-1 mb-2' color='primary' variant='contained' type='submit'>{loading ? <CircularProgress className='spinner__small' /> : heb.submit}</Button>
    </form>
  )
}

export default AddProfessorAndReview