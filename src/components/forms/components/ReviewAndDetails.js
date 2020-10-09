import { Typography, Slider, FormControlLabel, FormGroup, Checkbox, Chip, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import heb from '../../../utils/translation/heb'

const ReviewAndDetails = ({
  attendance,
  setAttendance,
  wouldTakeAgain,
  setWouldTakeAgain,
  tagsArray,
  setTagsArray,
  filterOptions,
  difficulty,
  setDifficulty,
  rating,
  setRating
}) => {
  const tagOptions = useSelector(state => state.tags.professorTags.tags)

  const handleAddTag = newTags => {
    if (tagsArray.length <= 4) {
      setTagsArray(newTags)
    }
  }

  return (
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
      <FormGroup>
        <Autocomplete
          multiple
          options={tagOptions?.map((v) => v)}
          defaultValue={[tagOptions[2]]}
          value={tagsArray}
          onChange={(event, newTags) => handleAddTag(newTags)}
          filterOptions={filterOptions}
          size='small'
          renderOption={v => <div className='autocomplete__option'>{v}</div>}
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
    </>
  )
}

export default ReviewAndDetails
