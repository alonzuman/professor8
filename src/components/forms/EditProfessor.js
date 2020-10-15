import { Button, CircularProgress, DialogContent, FormGroup, TextField, Typography } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteProfessor, updateProfessor } from '../../actions/professors'
import ApprovalContainer from '../../containers/dialogs/ApprovalContainer'
import heb from '../../utils/translation/heb'
import SearchBar from '../general/SearchBar'

const EditProfessor = ({ onClose }) => {
  const { loading, professor } = useSelector(state => state.professors)
  const [deleting, setDeleting] = useState(false)
  const [name, setName] = useState(professor?.name)
  const [school, setSchool] = useState(professor?.school)
  const history = useHistory()
  const dispatch = useDispatch()
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 30
  });

  const handleDelete = async () => {
    await dispatch(deleteProfessor(professor))
    history.push({
      pathname: '/'
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    await dispatch(updateProfessor({
      ...professor,
      name,
      school
    }))
    onClose()
  }

  return (
    <DialogContent className='rtl'>
      <ApprovalContainer loading={loading} open={deleting} onClose={() => setDeleting(false)} action={handleDelete} />
      {loading && <CircularProgress />}
      {!loading &&
        <form onSubmit={handleSubmit}>
          <FormGroup className='form__group'>
            <TextField label={heb.professorName} variant='outlined' size='small' value={name} onChange={e => setName(e.target.value)} />
          </FormGroup>
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
          <Button className='mt-1 ml-1' type='submit' color='primary' variant='contained'>{loading ? <CircularProgress className='spinner__small' /> : heb.submit}</Button>
          <Button className='mt-1' type='button' onClick={() => setDeleting(true)} variant='contained'>{heb.delete}</Button>
        </form>}
    </DialogContent>
  )
}

export default EditProfessor
