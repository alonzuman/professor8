import { Button, CircularProgress, DialogContent, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteProfessor } from '../../actions/professors'
import ApprovalContainer from '../../containers/dialogs/ApprovalContainer'
import heb from '../../utils/translation/heb'

const EditProfessor = () => {
  const [deleting, setDeleting] = useState(false)
  const history = useHistory()
  const { loading, professor } = useSelector(state => state.professors)
  const dispatch = useDispatch()

  const handleDelete = async () => {
    await dispatch(deleteProfessor(professor))
    history.push({
      pathname: '/'
    })
  }

  return (
    <DialogContent className='rtl'>
      <ApprovalContainer loading={loading} open={deleting} onClose={() => setDeleting(false)} action={handleDelete} />
      {loading && <CircularProgress />}
      {!loading &&
      <form>
        <Typography variant='body1'>
          Edit Professor Form
        </Typography>
        <Button type='button' onClick={() => setDeleting(true)} variant='contained'>{heb.delete}</Button>
      </form>}
    </DialogContent>
  )
}

export default EditProfessor
