import React from 'react'
import { Dialog, IconButton, Typography } from '@material-ui/core'
import heb from '../../utils/translation/heb';
import CloseIcon from '@material-ui/icons/Close';
import EditProfessor from '../../components/forms/EditProfessor';

const EditProfessorDialog = ({ open, onClose }) => {
  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <div className='header__container'>
        <Typography variant='h5'>{heb.editProfessor}</Typography>
        <IconButton onClick={onClose} style={{ marginLeft: -8 }}><CloseIcon /></IconButton>
      </div>
      <EditProfessor />
    </Dialog>
  )
}

export default EditProfessorDialog
