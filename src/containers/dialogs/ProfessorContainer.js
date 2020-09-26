import { Avatar, Dialog } from '@material-ui/core'
import React from 'react'
import Professor from '../../components/cards/Professor'

const ProfessorContainer = ({ id, open, onClose }) => {
  return (
    <Dialog fullWidth maxWidth='xl' open={open} onClose={onClose}>
      <Professor handleClose={onClose} id={id} />
    </Dialog>
  )
}

export default ProfessorContainer
