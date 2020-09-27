import { Avatar, Dialog } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Professor from '../../components/cards/Professor'
import qs from 'query-string'
import { useSelector } from 'react-redux'

const ProfessorContainer = ({ id, open, onClose }) => {
  const { professor, loading } = useSelector(state => state.professors)
  const history = useHistory()

  return (
    <Dialog fullWidth maxWidth='xl' open={open} onClose={onClose}>
      <Professor loading={loading} professor={professor} handleClose={onClose} id={id} />
    </Dialog>
  )
}

export default ProfessorContainer
