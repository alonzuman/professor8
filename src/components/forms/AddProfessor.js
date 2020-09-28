import React, { useEffect, useState } from 'react';
import { Button, Chip, CircularProgress, FormGroup, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { validateStringInput } from '../../utils';
import heb from '../../utils/translation/heb';
import SearchBar from '../general/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { addProfessor } from '../../actions/professors';
import { Autocomplete } from '@material-ui/lab';

const AddProfessor = ({ onClose }) => {
  const { loading } = useSelector(state => state.professors)
  const tagOptions = useSelector(state => state.tags.professorTags.tags)
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [tagsArray, setTagsArray] = useState([])
  const dispatch = useDispatch()

  const handleAddTag = newTags => {
    if (tagsArray.length <= 5) {
      setTagsArray(newTags)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const professor = { name, school, departure: '', tags: tagsArray, overallRating: 0, numberOfReviews: 0 }
    if (validateStringInput(name) && validateStringInput(school) && tags?.length > 0) {
      await dispatch(addProfessor(professor))
      onClose()
    } else {
      console.log('string not full')
    }
  }

  if (loading) {
    return <CircularProgress />
  } else {
    return (
      <form dir='rtl' onSubmit={handleSubmit}>
        <FormGroup className='form__group'>
          <TextField size='small' variant='outlined' label={heb.fullName} onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup className='form__group'>
          <SearchBar
            search={school}
            setSearch={setSchool}
            collection={'tags'}
            doc={'schools'}
            filter={'names'}
            placeholder={heb.institution}
            freeSolo
            size='small'
            style={{ marginTop: 0 }}
          />
        </FormGroup>
        <FormGroup>
          <Autocomplete
            multiple
            options={tagOptions.map((v) => v)}
            defaultValue={[tagOptions[2]]}
            value={tagsArray}
            onChange={(event, newTags) => handleAddTag(newTags)}
            freeSolo
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
        <Button className='full__width mt-1 mb-1' color='primary' variant='contained' type='submit'>{loading ? <CircularProgress className='spinner__small' /> :heb.submit}</Button>
      </form>
    )
  }
}

export default AddProfessor

const tags = ['סבלני', 'נחמד', 'קשוב', 'ממהר']
