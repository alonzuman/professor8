import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, FormGroup, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { db } from '../../firebase';
import { validateInput, validateStringInput } from '../../utils';
import heb from '../../utils/translation/heb';

const AddProfessor = () => {
  const [loading, setLoading] = useState(false)
  const [schools, setSchools] = useState([])
  const [professor, setProfessor] = useState({
    name: '',
    role: 'Professor',
    school: {},
    departure: '',
    tags: [],
    overallRating: 0,
  });

  const getSchools = async () => {
    setLoading(true)
    try {
      const snapshot = await db.collection('schools').get()
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      setSchools(results)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getSchools() }, [])

  const handleChange = e => {
    const { name, value } = e.target;
    setProfessor({
      ...professor,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { name, role, school } = professor;
    if (validateStringInput(name) && validateStringInput(role) && school) {
      try {
        await db.collection('professors').add(professor)
        console.log('added')
      } catch (error) {
        console.log(error)
      }
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
          <TextField variant='outlined' label={heb.fullName} name='name' onChange={handleChange} />
        </FormGroup>
        <FormGroup className='form__group'>
          <InputLabel label='Role'>{heb.role}</InputLabel>
          <Select variant='outlined' value={professor.role} name='role' onChange={handleChange}>
            <MenuItem value={'Professor'}>{heb.professor}</MenuItem>
            <MenuItem value={'Teacher Assistant'}>{heb.teacherAssistant}</MenuItem>
            <MenuItem value={'Teacher'}>{heb.teacher}</MenuItem>
          </Select>
        </FormGroup>
        <FormGroup className='form__group'>
          <InputLabel label='Role'>{heb.institution}</InputLabel>
          <Select dir='rtl' variant='outlined' value={professor.school} name='school' onChange={handleChange}>
            {schools?.map((school, index) => <MenuItem style={{ direction: 'rtl', textAlign: 'right', width: '100%' }} value={school} key={index}>{school.name}</MenuItem>)}
          </Select>
        </FormGroup>
        <Button color='primary' variant='contained' type='submit'>{heb.submit}</Button>
      </form>
    )
  }
}

export default AddProfessor
