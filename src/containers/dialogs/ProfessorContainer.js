import { Dialog } from '@material-ui/core'
import React from 'react'
import Professor from '../../components/cards/Professor'

const ProfessorContainer = ({ id, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Professor id={id} />
    </Dialog>
  )
}

export default ProfessorContainer
