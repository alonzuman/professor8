import { Dialog } from '@material-ui/core'
import React from 'react'
import School from '../../components/cards/School'

const SchoolContainer = ({ open, onClose }) => {
  return (
    <Dialog fullWidth maxWidth='xl' open={open} onClose={onClose}>
      <School handleClose={onClose} />
    </Dialog>
  )
}

export default SchoolContainer
