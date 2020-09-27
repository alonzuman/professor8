import React, { useState } from 'react';
import { Button, CircularProgress, FormGroup, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { validateStringInput } from '../../utils';
import heb from '../../utils/translation/heb';
import SearchBar from '../general/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { addProfessor } from '../../actions/professors';

const AddProfessor = ({ onClose }) => {
  const { loading } = useSelector(state => state.professors)
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    const professor = { name, school, departure: '', tags: [], overallRating: 0, numberOfReviews: 0 }
    if (validateStringInput(name) && validateStringInput(school)) {
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
          <TextField variant='outlined' label={heb.fullName} onChange={e => setName(e.target.value)} />
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
            style={{ marginTop: 0 }}
          />
        </FormGroup>
        <Button color='primary' variant='contained' type='submit'>{loading ? <CircularProgress className='spinner__small' /> :heb.submit}</Button>
      </form>
    )
  }
}

export default AddProfessor
