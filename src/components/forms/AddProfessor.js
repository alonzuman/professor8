import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, FormGroup, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { db } from '../../firebase';
import { validateInput, validateStringInput } from '../../utils';

const AddProfessor = () => {
  const [loading, setLoading] = useState(false)
  const [institutions, setInstitutions] = useState([])
  const [professor, setProfessor] = useState({
    name: '',
    role: 'Professor',
    institution: '',
    departure: '',
    tags: [],
    overallRating: 0,
  });

  const fetchInstitutions = async () => {
    setLoading(true)
    try {
      const snapshot = await db.collection('institutions').get()
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      setInstitutions(results)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchInstitutions() }, [])

  const handleChange = e => {
    const { name, value } = e.target;
    setProfessor({
      ...professor,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { name, role, institution } = professor;
    if (validateStringInput(name) && validateStringInput(role) && institution) {
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
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField variant='outlined' label='Full Name' name='name' onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <InputLabel label='Role'>Role</InputLabel>
          <Select variant='outlined' value={professor.role} name='role' onChange={handleChange}>
            <MenuItem value={'Professor'}>Professor</MenuItem>
            <MenuItem value={'Teacher Assistant'}>Teacher Assistant</MenuItem>
            <MenuItem value={'Teacher'}>Teacher</MenuItem>
          </Select>
        </FormGroup>
        <FormGroup>
          <InputLabel label='Role'>Institution</InputLabel>
          <Select variant='outlined' value={professor.institution} name='institution' onChange={handleChange}>
            {institutions?.map((institution, index) => <MenuItem value={institution} key={index}>{institution.name}</MenuItem>)}
          </Select>
        </FormGroup>
        {/* <FormGroup> */}
          {/* TODO load select of only relevant departures */}
          {/* <TextField variant='outlined' label='Departure' name='departure' onChange={handleChange} /> */}
        {/* </FormGroup> */}
        <Button type='submit'>Submit</Button>
      </form>
    )
  }
}

export default AddProfessor
